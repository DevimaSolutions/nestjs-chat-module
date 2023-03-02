import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMessageDto } from './dto';
import { ConverstionsService, MessagesService } from './services';

@Injectable()
export class AppService {
  constructor(
    @Inject('CHAT_SERVICE') private client: ClientProxy,
    private readonly conversationsService: ConverstionsService,
    private readonly messagesService: MessagesService,
  ) {}

  getHealthCheck() {
    return { isHealthy: true };
  }

  async createMessage({ conversationId, ...rest }: CreateMessageDto) {
    const conversation = await this.conversationsService.findById(
      conversationId,
    );

    if (!conversation) {
      throw new NotFoundException();
    }

    const message = await this.messagesService.create({
      ...rest,
      conversationId,
    });

    return message;
  }
}
