import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  dotenv.config(); // Завантажити .env файл
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  app.use(morgan('tiny'));
  app.enableCors(); // Вмикає CORS
  app.setGlobalPrefix('api');
  await app.listen(port || 3000, () => {
    console.log(`App started on port: ${port}`);
  });
}
bootstrap();
