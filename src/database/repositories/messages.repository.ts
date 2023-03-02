import { Injectable } from '@nestjs/common';
import { Message } from '../entities';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repositor';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }
}
