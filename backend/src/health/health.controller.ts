/**
 * @file health.controller.ts
 * @description Контроллер для проверки состояния здоровья приложения.
 * Использует NestJS Terminus для выполнения проверок здоровья,
 * таких как проверка доступности внешних сервисов и баз данных.
 * @author @KorzikAlex
 */
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

/**
 * @class HealthController
 * @description Контроллер для проверки состояния здоровья приложения.
 * Предоставляет эндпоинт /health, который возвращает статус здоровья приложения.
 * Включает проверки доступности внешних сервисов и баз данных.
 */
@Controller('health')
export class HealthController {
  /**
   * @constructor Создает экземпляр HealthController.
   * @description Инициализирует сервисы для проверки здоровья,
   * такие как HealthCheckService, HttpHealthIndicator и MongooseHealthIndicator.
   * @param health Сервис для выполнения проверок здоровья.
   * @param http Сервис для проверки доступности внешних HTTP сервисов.
   * @param mongoose Сервис для проверки доступности MongoDB баз данных.
   */
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('yandex', 'https://ya.ru'),
      // () => this.mongoose.pingCheck('mongodb'),
    ]);
  }
}
