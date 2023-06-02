import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Query,
  Param,
  Body,
  Delete,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetChatsResponseDto } from './dto/get-chats.response.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getIndexes(): Promise<GetChatsResponseDto[]> {
    return this.chatsService.findAll();
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async createIndex(
    @Body() body: { title: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title } = body;
    try {
      const chat = await this.chatsService.createChat(files, title);
      return chat;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async query(
    @Param() params: { id: string },
    @Query() query,
  ): Promise<{ message: string; answer: string }> {
    try {
      const answer = await this.chatsService.sendMessage(
        query.prompt,
        params.id,
      );
      return { message: 'Successfully queried index', answer: answer };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return this.chatsService.deleteIndex(params.id);
  }
}
