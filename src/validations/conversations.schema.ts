import * as Joi from 'joi';
import { CreateConversationDto } from 'src/dto';

export const createConversationSchema = Joi.object<CreateConversationDto>({
  name: Joi.string().trim().optional().default(null),
  imageUri: Joi.string().trim().optional().default(null),
  creatorId: Joi.string().trim().uuid().required(),
});

export const updateConversationSchema = Joi.object({
  name: Joi.string().trim().optional(),
  imageUri: Joi.string().trim().optional(),
  creatorId: Joi.string().trim().uuid().optional(),
});
