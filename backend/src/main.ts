import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("🔥 MAIN.TS IS RUNNING");

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  console.log("🔥 ABOUT TO LISTEN");

  await app.listen(3001);

  console.log("🚀 Backend running on http://localhost:3001");
}

bootstrap();