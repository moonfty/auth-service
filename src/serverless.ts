import serverlessExpress from '@vendia/serverless-express';
import { Context, Callback, Handler } from 'aws-lambda';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { mongoDbConnectionString, PORT } from './config';
import { ValidationPipeOptions } from './auth/validation/auth.validation';

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(new ValidationPipeOptions()));
  app.enableCors({
    origin: '*',
  });
  //API Documentation - Swagger Settings
  //   const config = new DocumentBuilder()
  //     .setTitle('Auth Service Documentation')
  //     .setVersion('1.0')
  //     .addTag('auth')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api', app, document);
  //initializeApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
