import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../../auth/auth.constants';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @Transform(({ value }) => bcrypt.hashSync(value, PASSWORD_SALT_ROUNDS))
  password: string;
}
