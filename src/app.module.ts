import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { ConverstionsService } from './services';
import {
  ConversationsRepository,
  MessagesRepository,
} from './database/repositories';
import { MessagesService } from './services';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      namingStrategy: new SnakeNamingStrategy(),
      ...envConfig().database,
    }),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.REDIS,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConverstionsService,
    ConversationsRepository,
    MessagesService,
    MessagesRepository,
  ],
})
export class AppModule {}
