import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [
      // Frontend
      'http://127.0.0.1:8080',
      'http://localhost:8080',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Tailor Management API')
    .setDescription('API for managing orders and workers in a tailor shop')
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
  const outFile = resolve(process.cwd(), '..', './openapi.json');
  writeFileSync(outFile, JSON.stringify(documentFactory, null, 2));

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on: http://127.0.0.1:${process.env.PORT ?? 3000}`,
    );
  });
}

void bootstrap();
