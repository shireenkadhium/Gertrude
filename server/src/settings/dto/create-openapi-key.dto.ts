import { IsString } from 'class-validator';

export class CreateOpenapiKeyDto {
  @IsString()
  value: string;
}
