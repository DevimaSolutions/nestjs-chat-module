import { Injectable } from '@nestjs/common';
import { MessagesRepository } from 'src/database/repositories';
import { CreateMessageDto } from 'src/dto';

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  async create(data: CreateMessageDto) {
    const entity = this.messagesRepository.create(data);

    await this.messagesRepository.save(entity);

    return entity;
  }
}
