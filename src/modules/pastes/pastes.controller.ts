import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { CreatePasteDto } from './dto/create-paste.dto';
import { UpdatePasteDto } from './dto/update-paste.dto';
import { Paste } from './paste.entity';
import { PastesService } from './pastes.service';

import { User } from 'src/modules/users/users.entity';

@Controller('api/pastes')
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() createPasteDto: CreatePasteDto,
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
    return this.pastesService.update(+id, updatePasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastesService.remove(+id);
  }
}
