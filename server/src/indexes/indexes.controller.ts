import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { IndexesService } from './indexes.service';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('indexes')
export class IndexesController {
  constructor(private readonly indexesService: IndexesService) {}

  // @Post()
  // create(@Body() createIndexDto: CreateIndexDto) {
  //   return this.indexesService.create(createIndexDto);
  // }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createIndex(@UploadedFiles() files: Array<Express.Multer.File>) {
    await this.indexesService.create(files);
    return { message: 'Successfully uploaded files and created index' };
  }
  // @Get()
  // findAll() {
  //   return this.indexesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indexesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndexDto: UpdateIndexDto) {
    return this.indexesService.update(+id, updateIndexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indexesService.remove(+id);
  }

  @Get()
  async query(@Query() query): Promise<{ message: string; answer: string }> {
    console.log(query);
    const answer = await this.indexesService.query(query.prompt);
    return { message: 'Successfully queried index', answer: answer };
  }
}
