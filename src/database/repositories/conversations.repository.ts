import { Injectable } from '@nestjs/common';
import { Conversation } from '../entities';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repositor';

@Injectable()
export class ConversationsRepository extends BaseRepository<Conversation> {
  constructor(private dataSource: DataSource) {
    super(Conversation, dataSource.createEntityManager());
  }
}
