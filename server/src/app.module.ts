import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CoreModule } from './@core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IndexesModule } from './indexes/indexes.module';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, IndexesModule],
  controllers: [AppController],
})
export class AppModule {}