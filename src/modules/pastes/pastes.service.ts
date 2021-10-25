/* eslint-disable import/first */
/* eslint-disable class-methods-use-this */
import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { FindConditions, FindOneOptions, In, Repository } from 'typeorm';

import { CreatePasteDto } from './dto/create-paste.dto';
import { UpdatePasteDto } from './dto/update-paste.dto';
import { Paste } from './paste.entity';

import { User } from 'src/modules/users/users.entity';
import { ShortCodeService } from 'src/services/short-code/short-code-generator.service';

@Injectable()
export class PastesService {
  constructor(
    @InjectRepository(Paste)
    private readonly pasteRepo: Repository<Paste>,
    private readonly shortCodeService: ShortCodeService,
  ) {}

  async create(createPasteDto: CreatePasteDto, user: User): Promise<Paste> {
    const shortCode = await this.shortCodeService.generate(`${Date.now()}`);

    // Check if code is unique, otherwise cary on
    const isCodeExists = await this.isCodeExists(shortCode);
    if (isCodeExists) {
      return this.create(createPasteDto, user); // Recursively call create
    }

    return this.pasteRepo.save({ ...createPasteDto, shortCode, user });
  }

  async findOne(
    where: FindConditions<Paste>,
    opts?: FindOneOptions<Paste>,
  ): Promise<Paste | undefined> {
    return this.pasteRepo.findOne({
      ...opts,
      where,
    });
  }

  update(id: string, updatePasteDto: UpdatePasteDto) {
    return this.pasteRepo.update(id, updatePasteDto);
  }

  async remove(id: string): Promise<{ rows: number }> {
    const result = await this.pasteRepo.delete(id);

    return {
      rows: result.affected,
    };
  }

  async isCodeExists(shortCode: string): Promise<boolean> {
    const p = await this.findOne({ shortCode });

    return !!p;
  }

  async findActivePastes(user: User): Promise<Paste[] | null> {
    const activePastes = await this.pasteRepo
      .createQueryBuilder('p')
      .where(' "p"."user_id" = :userId ', {
        userId: user.id,
      })
      .andWhere(
        `
        ( 
          p.expiry_date IS NULL 
          OR
          (
            "p"."expiry_date" >= :currentTime :: timestamptz
          )
        )
        `,
        {
          currentTime: moment().toISOString(),
        },
      )
      .getMany();

    return activePastes;
  }

  // FOr internal use only, to be troggered by an admin or cleanup process
  async removeExpiredPastes(pastes: string[] = []): Promise<{ rows: number }> {
    const result = await this.pasteRepo
      .createQueryBuilder()
      .delete()
      .from(Paste)
      .where('expiry_date <= :currentTime :: timestamptz', {
        currentTime: moment().toISOString(),
      })
      .orWhereInIds(pastes)
      .execute();

    return { rows: result.affected };
  }
}
