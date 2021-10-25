/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { CreatePasteDto } from './dto/create-paste.dto';
import { UpdatePasteDto } from './dto/update-paste.dto';
import { Paste } from './paste.entity';
import { PastesService } from './pastes.service';
import { SanitizeTextPipe } from './pipes/sanitize-text.pipe';

import { User } from 'src/modules/users/users.entity';

@Controller('api/pastes')
@UseInterceptors(ClassSerializerInterceptor)
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body(SanitizeTextPipe) createPasteDto: CreatePasteDto,
    @Req() request: Request,
  ): Promise<Paste> {
    return this.pastesService.create(createPasteDto, request.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Paste> {
    return this.pastesService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePasteDto: UpdatePasteDto) {
    return this.pastesService.update(id, updatePasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastesService.remove(id);
  }

  @Delete('/admin/expire-pastes')
  removeExpiredPastes(@Body() body: { pastes?: string[] }) {
    return this.pastesService.removeExpiredPastes(body.pastes);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/user/active')
  getActivePastes(@Req() request: Request): Promise<Paste[]> {
    return this.pastesService.findActivePastes(request.user as User);
  }

  @Get('/get-by-code/:shortCode')
  async getPaste(@Param('shortCode') shortCode: string): Promise<Paste> {
    const paste = await this.pastesService.findOne(
      { shortCode },
      { relations: ['user'] },
    );
    if (!paste) {
      throw new NotFoundException('Paste does not exist');
    }

    if (paste.isPasteExpired) {
      throw new NotFoundException('Sorry, this paste has expired');
    }

    return paste;
  }
}
