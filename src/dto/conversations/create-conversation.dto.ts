export class CreateConversationDto {
  name?: string;
  imageUri?: string;
  creatorId: string;
  recipientId: string;
}
