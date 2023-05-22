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
import { Roles } from '../users/roles/role.decorator';
import Role from '../users/roles/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('openapi-key')
  @Roles(Role.Admin)
  create(@Body() createOpenapiKeyDto: CreateOpenapiKeyDto) {
    return this.settingsService.createApiKey(createOpenapiKeyDto);
  }

  @Get('openapi-key')
  @Roles(Role.Admin)
  findOne() {
    return this.settingsService.getApiKey();
  }

  @Delete('openapi-key')
  @Roles(Role.Admin)
  remove() {
    return this.settingsService.removeApiKey();
  }
}
