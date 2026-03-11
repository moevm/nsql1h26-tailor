/**
 * @file app.module.ts
 * @description Главный модуль приложения, который объединяет все остальные модули.
 * @author @KorzikAlex
 */
import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';

/**
 * @class AppModule
 * @description Главный модуль приложения, который объединяет все остальные модули.
 */
@Module({
  imports: [HealthModule],
})
export class AppModule {}
