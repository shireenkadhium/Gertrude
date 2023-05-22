import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOpenapiKeyDto } from './dto/create-openapi-key.dto';
import { Setting } from './entities/setting.entity';
import { SettingsProperties } from './settings.constants';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}

  createApiKey(createSettingDto: CreateOpenapiKeyDto) {
    const setting = new Setting();
    setting.property = SettingsProperties.OPENAPI_KEY;
    setting.value = createSettingDto.value;
    return this.settingRepository.save(setting);
  }

  getApiKey(): Promise<Setting> {
    return this.settingRepository.findOne({
      where: { property: SettingsProperties.OPENAPI_KEY },
    });
  }

  removeApiKey() {
    return this.settingRepository.delete({
      property: SettingsProperties.OPENAPI_KEY,
    });
  }
}
