import { Exclude } from 'class-transformer';

@Exclude()
export class GetChatsResponseDto {
  id: string;
  files: string[];
}
