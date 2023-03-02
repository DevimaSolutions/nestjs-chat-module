import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateConversationDto,
  HealthCheckDto,
  SendMessageDto,
  UpdateConversationDto,
} from './dto';
import { ConverstionsService } from './services';
import { JoiValidationPipe } from './pipes';
import { createConversationSchema } from './validations';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly converstionsService: ConverstionsService,
  ) {}

  @Get()
  getHealthCheck(): HealthCheckDto {
    return this.appService.getHealthCheck();
  }

  @MessagePattern({ role: 'conversation', cmd: 'create' })
  createConversation(
    @Payload(new JoiValidationPipe(createConversationSchema))
    data: CreateConversationDto,
  ) {
    return this.converstionsService.create(data);
  }

  @MessagePattern({ role: 'conversation', cmd: 'update' })
  updateConversation(
    @Payload()
    data: UpdateConversationDto,
  ) {
    return this.converstionsService.update(data);
  }

  @MessagePattern({ role: 'conversation', cmd: 'get-all' })
  getConversations(@Payload() userId: string) {
    return this.converstionsService.findAll(userId);
  }

  @MessagePattern({ role: 'message', cmd: 'create' })
  createMessage(@Payload() data: SendMessageDto) {
    return this.appService.createMessage(data);
  }
}
