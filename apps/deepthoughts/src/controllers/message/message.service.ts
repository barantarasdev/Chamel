import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MessageT, UpdateMessageT } from '../../types/message';
import { CreateMessageDTO } from './dto/message-create.dto';

@Injectable()
export class MessageService {
  constructor(private databaseService: DatabaseService) {}

  async getMessage(messageId: string | null): Promise<MessageT | null> {
    return await this.databaseService.getMessage(messageId);
  }

  async createMessage(dto: CreateMessageDTO): Promise<MessageT> {
    return await this.databaseService.createMessage(dto);
  }

  async updateMessage({ messageId, dto }: UpdateMessageT): Promise<MessageT> {
    return await this.databaseService.updateMessage({ dto, messageId });
  }

  async removeMessage(messageId: string): Promise<Pick<MessageT, 'id'> | null> {
    return await this.databaseService.removeMessage(messageId);
  }
}
