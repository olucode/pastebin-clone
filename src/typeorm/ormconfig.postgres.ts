import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvConfig } from '../config/config.env';

import { TypeOrmNamingStrategy } from './typeorm-naming-strategy';

const env = plainToClass(
  EnvConfig,
  { ...EnvConfig.getDefaultObject(), ...process.env },
  { enableImplicitConversion: true },
);
const errors = validateSync(env, { whitelist: true });
if (errors.length > 0) {
  // eslint-disable-next-line no-console
  Logger.error(JSON.stringify(errors, undefined, '  '));
  throw new Error('Invalid env.');
}

const extra = { ssl: { rejectUnauthorized: false } };

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  url: env.TYPEORM_DB_URL,
  ssl: env.NODE_ENV !== 'development',
  extra: env.NODE_ENV !== 'development' ? extra : {},
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: env.TYPEORM_LOGGING,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = options;
