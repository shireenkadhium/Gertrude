import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdateIndexDto } from './dto/update-index.dto';
import { spawn } from 'child_process';

import * as fs from 'fs';
import * as path from 'path';
import { SettingsService } from '../settings/settings.service';
import { ERROR_MESSAGES } from './indexes.constants';

@Injectable()
export class IndexesService {
  constructor(private readonly settingsService: SettingsService) {}
  saveDocuments(files: Array<Express.Multer.File>) {
    const directoryPath = 'assets/temp';
    this.removeExistingFiles(directoryPath);
    this.saveFiles(directoryPath, files);
  }
  async create(files: Array<Express.Multer.File>): Promise<string> {
    this.saveDocuments(files);
    const apiKeySetting = await this.settingsService.getApiKey();
    const OPENAI_API_KEY = apiKeySetting?.value;

    if (!OPENAI_API_KEY) {
      throw new ForbiddenException(ERROR_MESSAGES.INVALID_OPENAPI_KEY);
    }

    return new Promise((resolve, reject) => {
      const scriptPath = path.resolve(
        __dirname,
        '../..',
        'indexes/scripts/create-index.py',
      );
      const process = spawn('python3', [scriptPath, OPENAI_API_KEY]);
      let result = '';
      process.stdout.on('data', (data) => {
        console.log(data.toString());
        result += data.toString();
      });
      process.stderr.on('data', (data) => {
        console.log('errr', data.toString());
        result += data.toString();
      });
      process.on('close', function (code) {
        if (code !== 0) {
          return reject('Error creating index');
        }
        resolve(result);
      });
      process.on('error', function (err) {
        console.log(err.toString());
        reject(err);
      });
    });
  }

  async query(prompt: string): Promise<string> {
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
      const process = spawn('python3', [scriptPath, OPENAI_API_KEY, prompt]);
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

  // create(createIndexDto: CreateIndexDto) {
  //   return 'This action adds a new index';
  // }

  findAll() {
    return `This action returns all indexes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} index`;
  }

  update(id: number, updateIndexDto: UpdateIndexDto) {
    return `This action updates a #${id} index`;
  }

  remove(id: number) {
    return `This action removes a #${id} index`;
  }
}
