import { ApiProperty } from '@nestjs/swagger';
import { UpdateMessageDTO } from '../dto/message-update.dto';

export class MessageC {
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'Message id',
  })
  id: string;
  @ApiProperty({ example: 'name', description: 'Message text' })
  text: string;
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'Sender id',
  })
  senderId: string;
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'Receiver id',
  })
  receiverId: string;
}

export interface UpdateMessageI {
  dto: UpdateMessageDTO;
  messageId: string;
}
