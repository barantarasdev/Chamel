import { Module } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
