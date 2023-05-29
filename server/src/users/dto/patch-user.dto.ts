import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../../auth/auth.constants';

export class PatchUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => bcrypt.hashSync(value, PASSWORD_SALT_ROUNDS))
  password?: string;
}
