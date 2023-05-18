import { Exclude, Expose } from 'class-transformer';

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
}
