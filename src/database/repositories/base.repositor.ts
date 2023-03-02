import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class BaseRepository<
  Entity extends BaseEntity,
> extends Repository<Entity> {}
