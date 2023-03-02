import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { Conversation } from './conversation.entity';

@Entity({ name: 'conversation_members' })
export class ConversationMember extends AuditEntity {
  @Column()
  conversationId: string;

  @Column()
  userId: string;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.conversationMembers,
  )
  conversation: Conversation;
}
