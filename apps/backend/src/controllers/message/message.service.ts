import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { CreateMessageDTO } from './dto/message-create.dto'
import { CMessage, IUpdateMessage } from './interfaces/message.interface'

@Injectable()
export class MessageService {
  constructor(private databaseService: DatabaseService) {}

  async getMessage(messageId: string | null): Promise<CMessage | null> {
    return await this.databaseService.getMessage(messageId)
  }

  async createMessage(dto: CreateMessageDTO): Promise<CMessage> {
    return await this.databaseService.createMessage(dto)
  }

  async updateMessage({ messageId, dto }: IUpdateMessage): Promise<CMessage> {
    return await this.databaseService.updateMessage({ dto, messageId })
  }

  async removeMessage(messageId: string): Promise<Pick<CMessage, 'id'> | null> {
    return await this.databaseService.removeMessage(messageId)
  }
}
