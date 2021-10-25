/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';

const configServiceMockValue = {
  env: {
    NODE_ENV: 'test',
    PORT: 3000,
    TYPEORM_TYPE: 'sqlite',
    TYPEORM_DB_URL: '',
    TYPEORM_LOGGING: false,
    HEALTH_CHECK_DATABASE_TIMEOUT_MS: 3000,
    JWT_SECRET: '',
    JWT_EXPIRES_IN: 86400,
    SKIP_AUTH: true,
    SWAGGER_UI: false,
    HASHID_SALT: 'hash-secret',
  },
};
export const ConfigServiceMock = {
  provide: ConfigService,
  useValue: configServiceMockValue,
};

@Module({
  providers: [ConfigServiceMock],
  exports: [ConfigServiceMock],
})
export class ConfigModuleMock {}
