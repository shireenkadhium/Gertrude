import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../../auth/auth.constants';
import Role from '../roles/role.enum';

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

  @IsArray()
  roles?: Role[];
}
