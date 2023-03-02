export class CreateMessageDto {
  senderId: string;
  conversationId: string;
  message: string;
  type: number;
}
