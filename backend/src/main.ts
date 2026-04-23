import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use(helmet());

  app.enableCors({
    origin: [
      // Frontend
      'http://127.0.0.1:8080',
      'http://localhost:8080',
    ],
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

void bootstrap();
