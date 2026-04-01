/**
 * @file app.module.ts
 * @description Главный модуль приложения, который объединяет все остальные модули.
 * @author @KorzikAlex
 */
import { resolve } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthModule } from './health/health.module';

/**
 * @class AppModule
 * @description Главный модуль приложения, который объединяет все остальные модули.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: resolve(__dirname, '../../.env'),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('MONGO_HOST');
        const port = configService.get<number>('MONGO_PORT');
        const db = configService.get<string>('MONGO_INITDB_DATABASE');

        const user = configService.get<string>('MONGO_INITDB_ROOT_USERNAME');
        const pass = configService.get<string>('MONGO_INITDB_ROOT_PASSWORD');

        const hasAuth = user && pass;

        return {
          uri: hasAuth
            ? `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`
            : `mongodb://${host}:${port}/${db}`,
        };
      },
    }),
    HealthModule,
  ],
})
export class AppModule {}
