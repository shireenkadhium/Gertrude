import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  roles: string[];
}
