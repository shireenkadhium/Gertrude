import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('db.postgres.name'),
        host: configService.get('db.postgres.host'),
        port: configService.get('db.postgres.port'),
        username: configService.get('db.postgres.user'),
        password: configService.get('db.postgres.password'),
        synchronize: configService.get('db.postgres.synchronize'),
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
