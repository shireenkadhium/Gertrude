import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CoreModule } from './@core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, ChatsModule, SettingsModule],
  controllers: [AppController],
})
export class AppModule {}
