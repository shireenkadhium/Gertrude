import { Exclude, Expose } from 'class-transformer';
import Role from '../roles/role.enum';

@Exclude()
export class CreateUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  roles: Role[];
}
