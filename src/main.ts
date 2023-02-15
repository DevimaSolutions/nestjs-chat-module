import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envConfig from './config/env.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { redis } = envConfig();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: redis.host,
        port: redis.port,
      },
    },
  );

  await app.listen();
}
bootstrap();
