import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsEmail, MinLength } from 'class-validator';

import { User } from '../../users/users.entity';

@InputType()
export class RegisterAccountDto implements Partial<User> {
  @ApiProperty()
  @Field()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
