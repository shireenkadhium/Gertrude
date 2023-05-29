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
} from '@nestjs/common';
import { IndexesService } from './indexes.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetIndexResponseDto } from './dto/get-index.response.dto';

@ApiTags('Indexes')
@Controller('indexes')
export class IndexesController {
  constructor(private readonly indexesService: IndexesService) {}

  @Get()
  async getIndexes(): Promise<GetIndexResponseDto[]> {
    return this.indexesService.findAll();
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async createIndex(
    @Body() body: { title: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title } = body;
    return await this.indexesService.createLlamaIndex(files, title);
  }

  @Get(':id')
  async query(
    @Param() params: { id: string },
    @Query() query,
  ): Promise<{ message: string; answer: string }> {
    console.log(params, query);
    const answer = await this.indexesService.queryLlamaIndex(
      query.prompt,
      params.id,
    );
    return { message: 'Successfully queried index', answer: answer };
  }
  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return this.indexesService.deleteIndex(params.id);
  }
}
