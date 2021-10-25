/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';

const Hashids = require('hashids/cjs');

@Injectable()
export class ShortCodeService {
  constructor(private readonly config: ConfigService) {}

  async generate(encoder: string): Promise<string> {
    return this.hashId(Number.parseInt(encoder, 20));
  }

  private hashId(encoder: number): string {
    const hashids = new Hashids(this.config.env.HASHID_SALT);

    return hashids.encode(encoder);
  }
}
