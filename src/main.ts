import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { mongoDbConnectionString, PORT } from './config';
import { ValidationPipeOptions } from './auth/validation/auth.validation';
import { initializeApp } from 'firebase-admin/app';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(new ValidationPipeOptions()));
  app.enableCors({
    origin: '*',
  });
  //API Documentation - Swagger Settings
  const config = new DocumentBuilder()
    .setTitle('Auth Service Documentation')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //initializeApp();
  app.use(helmet());
  await app.listen(PORT);
}
bootstrap();
