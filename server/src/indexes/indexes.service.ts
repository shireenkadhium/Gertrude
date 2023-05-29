import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { spawn } from 'child_process';

import * as fs from 'fs';
import * as path from 'path';
import { SettingsService } from '../settings/settings.service';
import { ERROR_MESSAGES } from './indexes.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Index } from './entities/index.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IndexesService {
  constructor(
    private readonly settingsService: SettingsService,
    @InjectRepository(Index) private indexRepository: Repository<Index>,
  ) {}
  async createLlamaIndex(
    files: Array<Express.Multer.File>,
    indexTitle: string,
  ): Promise<Index> {
    this.saveDocuments(files);
    const apiKeySetting = await this.settingsService.getApiKey();
    const OPENAI_API_KEY = apiKeySetting?.value;

    if (!OPENAI_API_KEY) {
      throw new ForbiddenException(ERROR_MESSAGES.INVALID_OPENAPI_KEY);
    }

    const fileNames = files.map((file) => file.originalname);

    const index = await this.createIndex(fileNames, indexTitle);
    const id = index.id;

    if (!OPENAI_API_KEY) {
      throw new ForbiddenException(ERROR_MESSAGES.INVALID_OPENAPI_KEY);
    }

    return new Promise((resolve, reject) => {
      const scriptPath = path.resolve(
        __dirname,
        '../..',
        'indexes/scripts/create-index.py',
      );
      const process = spawn('python3', [scriptPath, OPENAI_API_KEY, id]);
      let result = '';
      process.stdout.on('data', (data) => {
        console.log(data.toString());
        result += data.toString();
      });
      process.stderr.on('data', (data) => {
        console.log('errr', data.toString());
        result += data.toString();
      });
      process.on('close', (code) => {
        if (code !== 0) {
          this.deleteIndex(index.id);
          return reject('Error creating index');
        }
        resolve(index);
      });
      process.on('error', (err) => {
        console.log(err.toString());
        reject(err);
      });
    });
  }

  async queryLlamaIndex(prompt: string, indexName: string): Promise<string> {
    const apiKeySetting = await this.settingsService.getApiKey();
    const OPENAI_API_KEY = apiKeySetting?.value;

    if (!OPENAI_API_KEY) {
      throw new ForbiddenException(ERROR_MESSAGES.INVALID_OPENAPI_KEY);
    }

    return new Promise((resolve, reject) => {
      const scriptPath = path.resolve(
        __dirname,
        '../..',
        'indexes/scripts/query-index.py',
      );
      const process = spawn('python3', [
        scriptPath,
        OPENAI_API_KEY,
        prompt,
        indexName,
      ]);
      let result = '';
      process.stdout.on('data', (data) => {
        console.log(data.toString());
        result += data.toString();
      });
      process.on('close', function (code) {
        if (code !== 0) {
          return reject('Error querying index');
        }
        resolve(result);
      });
      process.on('error', function (err) {
        console.log(err.toString());
        reject(err);
      });
    });
  }

  private removeExistingFiles(directoryPath: fs.PathLike) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    } else {
      const existingFiles = fs.readdirSync(directoryPath);
      existingFiles.forEach((fileName) => {
        const filePath = `${directoryPath}/${fileName}`;
        fs.unlinkSync(filePath);
      });
    }
  }

  private saveFiles(directoryPath: string, files: Array<Express.Multer.File>) {
    for (const file of files) {
      const originalName = file.originalname;
      const filePath = path.join(directoryPath, originalName);
      fs.writeFileSync(filePath, file.buffer);
    }
  }

  async createIndex(files: string[], title: string) {
    try {
      const existingIndex = await this.indexRepository.findOneBy({ title });
      if (existingIndex) {
        throw new BadRequestException('Chat with this name already exists');
      }
      return this.indexRepository.save({ files, title });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  findAll() {
    return this.indexRepository.find();
  }

  findOne(id: string) {
    return this.indexRepository.findOneBy({ id });
  }

  deleteIndex(id: string) {
    const filePath = `assets/indexes/${id}.json`;
    fs.unlinkSync(filePath);

    return this.indexRepository.delete(id);
  }

  saveDocuments(files: Array<Express.Multer.File>) {
    const directoryPath = 'assets/temp';
    this.removeExistingFiles(directoryPath);
    this.saveFiles(directoryPath, files);
  }
}
