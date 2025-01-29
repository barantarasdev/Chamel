import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { DatabaseService } from '../database/database.service'
import { JwtService } from '@nestjs/jwt'
import { WsAuthAccessToken } from '../middlewares/ws-auth-access-token.middleware'
import { UnauthorizedException } from '@nestjs/common'
import { CreateMessageDTO } from '../controllers/message/dto/message-create.dto'
import { ERRORS } from '../constants/errors'

@WebSocketGateway(Number(process.env.WS_PORT), {
  cors: { origin: process.env.ALLOWED_URL },
  namespace: 'message',
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  //{userId: Socket}
  private activeUsers: Map<string, Socket> = new Map()

  constructor(private databaseService: DatabaseService, private readonly jwtService: JwtService) {}

  @WebSocketServer() server: Server

  afterInit(@ConnectedSocket() server: Server) {
    server.use(WsAuthAccessToken(this.jwtService, this.databaseService))
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client['user'].sub

    if (userId) {
      this.activeUsers.set(userId, client)
      this.server.emit('connected')
    } else {
      client.disconnect()
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = client['user'].sub

    this.activeUsers.delete(userId)
    this.server.emit('disconnected')
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: CreateMessageDTO, @ConnectedSocket() client: Socket) {
    const user = client['user']

    if (!user) {
      throw new UnauthorizedException(ERRORS.UNAUTHORIZED)
    }

    const { receiverId, text } = data
    const senderId = user.sub
    const receiver = this.activeUsers.get(receiverId)

    await this.databaseService.createMessage({
      senderId,
      receiverId,
      text: text,
    })

    if (receiver) {
      receiver.emit('message', {
        senderId,
        text,
      })
    }
  }

  private getUserIdByActiveClientId(clientId: string): string {
    return Array.from(this.activeUsers.entries())
      .filter(([, value]) => value.id === clientId)
      .map(([key]) => key)[0]
  }
}
