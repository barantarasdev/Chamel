import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';

const { PORT, ALLOWED_URL, ALLOWED_METHODS } = process.env;

async function bootstrap() {
  //App
  const app = await NestFactory.create(MainModule, {
    logger: ['log'],
    abortOnError: false,
  });

  //Cors
  app.enableCors({
    origin: ALLOWED_URL,
    methods: ALLOWED_METHODS,
    preflightContinue: false,
  });

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Chamel')
    .setDescription('The Chamel API description')
    .setVersion('1.0')
    .addTag('CHAMEL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap();
