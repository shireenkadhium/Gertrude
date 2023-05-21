import { Module } from '@nestjs/common';
import { IndexesService } from './indexes.service';
import { IndexesController } from './indexes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Index } from './entities/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Index])],
  controllers: [IndexesController],
  providers: [IndexesService],
})
export class IndexesModule {}
