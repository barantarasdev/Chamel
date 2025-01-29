import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateMessageDTO } from './dto/message-create.dto'
import { UpdateMessageDTO } from './dto/message-update.dto'
import { MessageService } from './message.service'
import { AccessTokenGuard } from '../../guards/acess-token.guard'
import { messageValidation } from '@libs/core'
import { CommonZodValidationPipe } from '../../pipes/common-zod-validation.pipe'
import { CMessage } from './interfaces/message.interface'

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Get message' })
  @ApiResponse({ status: 200, type: CMessage })
  @ApiParam({ name: 'messageId', required: true, description: 'Message id' })
  @Get('/:messageId')
  getMessage(@Param('messageId') messageId: string): Promise<CMessage | null> {
    return this.messageService.getMessage(messageId)
  }

  @ApiOperation({ summary: 'Create message' })
  @ApiResponse({ status: 201, type: CMessage })
  @ApiBody({ type: CreateMessageDTO })
  @UsePipes(new CommonZodValidationPipe(messageValidation.createMessageSchema))
  @Post()
  createMessage(@Body() dto: CreateMessageDTO): Promise<CMessage> {
    return this.messageService.createMessage(dto)
  }

  @ApiOperation({ summary: 'Update message' })
  @ApiResponse({ status: 200, type: CMessage })
  @ApiParam({ name: 'messageId', required: true, description: 'Message id' })
  @ApiBody({ type: UpdateMessageDTO })
  @UsePipes(new CommonZodValidationPipe(messageValidation.updateMessageSchema))
  @Put('/:messageId')
  updateMessage(
    @Param('messageId') messageId: string,
    @Body() dto: UpdateMessageDTO,
  ): Promise<CMessage> {
    return this.messageService.updateMessage({ dto, messageId })
  }

  @ApiOperation({ summary: 'Remove message' })
  @ApiResponse({ status: 200, type: CMessage })
  @ApiParam({ name: 'messageId', required: true, description: 'Message id' })
  @Delete('/:messageId')
  deleteMessage(@Param('messageId') messageId: string): Promise<Pick<CMessage, 'id'> | null> {
    return this.messageService.removeMessage(messageId)
  }
}
