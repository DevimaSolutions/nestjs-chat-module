import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationsRepository } from 'src/database/repositories';
import { CreateConversationDto, UpdateConversationDto } from 'src/dto';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class ConverstionsService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  async create(data: CreateConversationDto) {
    const entity = this.conversationsRepository.create(data);
    await this.conversationsRepository.save(entity);
    return entity;
  }

  async findById(conversationId: string) {
    const entitty = await this.conversationsRepository.findOne({
      where: { id: conversationId },
    });

    if (!entitty) {
      throw new NotFoundException();
    }

    return entitty;
  }

  findAll(userId: string) {
    return this.conversationsRepository.find({
      where: [
        { creatorId: userId },
        {
          conversationMembers: {
            userId,
          },
          messages: { id: Not(IsNull()) },
        },
      ],
      relations: { conversationMembers: true, messages: true },
    });
  }

  async update({ conversationId, ...data }: UpdateConversationDto) {
    console.log(data);

    await this.conversationsRepository.update(conversationId, data);

    return this.findById(conversationId);
  }
}
