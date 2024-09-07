import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const port = process.env.port;

  app.enableCors({
    origin: process.env.ALLOW_URL,
    methods: process.env.ALLOWED_METHODS,
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

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
