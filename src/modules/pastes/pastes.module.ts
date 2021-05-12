import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthOptionsService } from '../auth/auth-options.service';

import { Paste } from './paste.entity';
import { PastesController } from './pastes.controller';
import { PastesService } from './pastes.service';

import { ConfigModule } from 'src/config/config.module';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [
    SharedModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Paste]),
  ],
  controllers: [PastesController],
  providers: [PastesService],
})
export class PastesModule {}
