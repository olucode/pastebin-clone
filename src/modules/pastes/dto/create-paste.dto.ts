import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePasteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  readonly expiryDate?: string;
}
