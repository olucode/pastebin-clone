import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { ShortCodeService } from './services/short-code/short-code-generator.service';

@Module({
  imports: [ConfigModule],
  providers: [ShortCodeService],
  exports: [ShortCodeService],
})
export class SharedModule {}
