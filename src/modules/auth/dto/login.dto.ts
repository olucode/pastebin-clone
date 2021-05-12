import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsEmail, MinLength } from 'class-validator';

import { User } from '../../users/users.entity';

@InputType()
export class LoginDto implements Partial<User> {
  @ApiProperty()
  @Field()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
