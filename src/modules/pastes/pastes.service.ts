/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

import { User } from '../users/users.entity';

import { CreatePasteDto } from './dto/create-paste.dto';
import { UpdatePasteDto } from './dto/update-paste.dto';
import { Paste } from './paste.entity';

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
      return this.create(createPasteDto, user); // Recursivel call create
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
    return `This action updates a #${id} paste`;
  }

  remove(id: number) {
    return `This action removes a #${id} paste`;
  }

  async isCodeUnique(shortCode: string): Promise<boolean> {
    const p = await this.findOne({ shortCode });

    return !!p;
  }
}
