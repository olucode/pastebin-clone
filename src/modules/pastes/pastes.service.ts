/* eslint-disable import/first */
/* eslint-disable class-methods-use-this */
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment');
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

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
    const isCodeUnique = await this.isCodeUnique(shortCode);
    if (!isCodeUnique) {
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

  update(id: number, updatePasteDto: UpdatePasteDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }

  async isCodeUnique(shortCode: string): Promise<boolean> {
    const p = await this.findOne({ shortCode });

    return !!p;
  }

  async findActivePaste(shortCode: string): Promise<Paste | null> {
    const p = await this.pasteRepo
      .createQueryBuilder('paste')
      .where('paste.shortCode = :shortCode', { shortCode })
      .andWhere('expiryDate IS NULL OR expiryDate < :currentTime ', {
        currentTime: moment().toISOString(),
      })
      .getOne();

    return p;
  }
}
