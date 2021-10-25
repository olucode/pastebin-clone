import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PastesModule } from './modules/pastes/pastes.module';
import { SharedModule } from './shared.module';

import { ConfigModule } from 'src/config/config.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HealthModule } from 'src/modules/health/health.module';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmOptionsService } from 'src/typeorm/typeorm-options.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    PastesModule,
    SharedModule,
  ],
})
export class AppModule {}
