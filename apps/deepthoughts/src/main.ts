import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV;
dotenv.config({ path: `./.env.${env}` });
const { PORT, ALLOWED_URL, ALLOWED_METHODS } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors({
    origin: ALLOWED_URL,
    methods: ALLOWED_METHODS,
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle('Chamel')
    .setDescription('The Chamel API description')
    .setVersion('1.0')
    .addTag('CHAMEL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

bootstrap();
