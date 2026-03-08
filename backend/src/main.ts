/**
 * @file main.ts
 * @description Точка входа в приложение.
 * @author @KorzikAlex
 */
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

/**
 * @function bootstrap
 * @description Функция для запуска приложения.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Используем Helmet для обеспечения безопасности HTTP-заголовков
  app.enableCors(); // Включаем CORS для разрешения запросов с других доменов
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
