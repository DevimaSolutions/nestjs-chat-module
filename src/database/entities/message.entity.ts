import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column({ type: 'uuid' })
  senderId: string;

  @Column({ type: 'uuid' })
  conversationId: string;

  @Column()
  message: string;

  @Column()
  type: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
