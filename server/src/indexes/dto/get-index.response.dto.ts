import { Exclude } from 'class-transformer';

@Exclude()
export class GetIndexResponseDto {
  id: string;
  files: string[];
}
