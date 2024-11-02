import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateMessageDTO } from './dto/message-create.dto';
import { MessageC, UpdateMessageT } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(private databaseService: DatabaseService) {}

  async getMessage(messageId: string | null): Promise<MessageC | null> {
    return await this.databaseService.getMessage(messageId);
  }

  async createMessage(dto: CreateMessageDTO): Promise<MessageC> {
    return await this.databaseService.createMessage(dto);
  }

  async updateMessage({ messageId, dto }: UpdateMessageT): Promise<MessageC> {
    return await this.databaseService.updateMessage({ dto, messageId });
  }

  async removeMessage(messageId: string): Promise<Pick<MessageC, 'id'> | null> {
    return await this.databaseService.removeMessage(messageId);
  }
}
