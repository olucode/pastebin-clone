/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreatePasteDto } from '../dto/create-paste.dto';

@Injectable()
export class SanitizeTextPipe
  implements PipeTransform<CreatePasteDto, CreatePasteDto> {
  transform(
    value: CreatePasteDto,
    { metatype }: ArgumentMetadata,
  ): CreatePasteDto {
    // eslint-disable-next-line global-require
    const Sanitize = require('sanitize');
    const sanitizer = Sanitize();
    try {
      const sanitized = sanitizer.value(value.content, 'str');

      const object = plainToClass(metatype, {
        ...value,
        content: sanitized,
      });

      return object;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Paste contents are invalid');
    }
  }
}
