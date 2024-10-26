import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDTO {
  @ApiProperty({ example: 'name', description: 'Message text' })
  text: string;
}
