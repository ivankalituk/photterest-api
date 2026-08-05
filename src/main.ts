import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // не уверен что решается так, но это решает
  // проблему типа big int в js
  (BigInt.prototype as any).toJSON = function () {
      return Number(this);
  };

  await app.listen(5000);
}

bootstrap();