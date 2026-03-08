/**
 * @file health.module.ts
 * @description Модуль для проверки состояния здоровья приложения.
 * Использует NestJS Terminus для организации проверок здоровья,
 * таких как проверка доступности внешних сервисов и баз данных.
 * @author @KorzikAlex
 */
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';

/**
 * @class HealthModule
 * @description Модуль для проверки состояния здоровья приложения.
 */
@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
