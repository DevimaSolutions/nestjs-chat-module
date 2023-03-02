import { Column, Entity, OneToMany } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { ConversationMember } from './conversation-member.entity';
import { Message } from './message.entity';

@Entity({ name: 'conversations' })
export class Conversation extends AuditEntity {
  @Column()
  name?: string;

  @Column()
  imageUri?: string;

  @Column()
  creatorId: string;

  @OneToMany(
    () => ConversationMember,
    (conversationMember) => conversationMember.conversation,
  )
  conversationMembers: ConversationMember[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
