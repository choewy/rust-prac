import { NestFactory } from '@nestjs/core';
import { AppModule } from './core';

const bootstrap = async () => {
  await NestFactory.create(AppModule);
};

bootstrap();
