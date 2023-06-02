import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import configuration from '../../config/configuration';
import { RolesGuard } from '../users/roles/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get('db.postgres.name'),
          host: configService.get('db.postgres.host'),
          port: configService.get('db.postgres.port'),
          username: configService.get('db.postgres.user'),
          password: configService.get('db.postgres.password'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CoreModule {}
