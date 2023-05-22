import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateOpenapiKeyDto } from './dto/create-openapi-key.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('openapi-key')
  create(@Body() createOpenapiKeyDto: CreateOpenapiKeyDto) {
    return this.settingsService.createApiKey(createOpenapiKeyDto);
  }

  @Get('openapi-key')
  findOne() {
    return this.settingsService.getApiKey();
  }

  @Delete('openapi-key')
  remove() {
    return this.settingsService.removeApiKey();
  }
}
