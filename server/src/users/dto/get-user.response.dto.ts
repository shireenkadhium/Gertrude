import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;
}
