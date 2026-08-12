import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🔥 MAIN.TS IS RUNNING');

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Render provides PORT automatically.
  // Local development will use 3001.
  const port = process.env.PORT || 3001;

  console.log('🔥 ABOUT TO LISTEN');

  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();