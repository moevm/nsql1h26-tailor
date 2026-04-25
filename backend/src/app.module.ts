import { resolve } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ExportModule } from './export/export.module';
import { HealthModule } from './health/health.module';
import { ImportModule } from './import/import.module';
import { OrdersModule } from './orders/orders.module';
import { WorkersModule } from './workers/workers.module';

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
    OrdersModule,
    WorkersModule,
    AuthModule,
    AnalyticsModule,
    ImportModule,
    ExportModule,
    DatabaseModule,
  ],
})
export class AppModule {}
