import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Завантажити .env файл
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  app.enableCors(); // Вмикає CORS
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
