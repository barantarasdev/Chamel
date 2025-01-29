import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateMessageDTO } from '../controllers/message/dto/message-create.dto'
import { CMessage, IUpdateMessage } from '../controllers/message/interfaces/message.interface'
import {
  CUser,
  ICreateRefreshToken,
  IGetRefreshToken,
  IUpdateRefreshToken,
} from '../controllers/auth/interfaces/auth.interface'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  // User

  async getUserByEmail(email: string): Promise<Pick<CUser, 'id' | 'password'> | null> {
    return await this.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    })
  }

  async createUser(
    dto: Pick<CUser, 'email' | 'password' | 'name'>,
  ): Promise<Pick<CUser, 'id' | 'email' | 'name'>> {
    return await this.user.create({
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
      },
    })
  }

  // Token

  async getRefreshTokenByToken(refreshToken: string): Promise<IGetRefreshToken | null> {
    return await this.token.findUnique({
      where: { refreshToken },
      select: {
        userId: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    })
  }

  async createRefreshToken({ userId, refreshToken }: ICreateRefreshToken): Promise<void> {
    await this.token.create({
      data: {
        userId,
        refreshToken,
      },
    })
  }

  async updateRefreshToken({ refreshToken, newRefreshToken }: IUpdateRefreshToken): Promise<void> {
    await this.token.update({
      where: { refreshToken },
      data: {
        refreshToken: newRefreshToken,
      },
    })
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    await this.token.delete({
      where: { refreshToken },
    })
  }

  async addTokenToBlacklist(token: string): Promise<void> {
    await this.token_blacklist.create({
      data: {
        token,
      },
    })
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return !!(await this.token_blacklist.findUnique({
      where: {
        token,
      },
    }))
  }

  // Message

  async getMessage(messageId: string): Promise<CMessage | null> {
    return await this.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        text: true,
        senderId: true,
        receiverId: true,
      },
    })
  }

  async createMessage(dto: CreateMessageDTO): Promise<CMessage> {
    return await this.message.create({
      data: dto,
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        text: true,
      },
    })
  }

  async updateMessage({ messageId, dto }: IUpdateMessage): Promise<CMessage> {
    return await this.message.update({
      where: { id: messageId },
      data: dto,
      select: {
        id: true,
        text: true,
        senderId: true,
        receiverId: true,
      },
    })
  }

  async removeMessage(messageId: string): Promise<Pick<CMessage, 'id'> | null> {
    return await this.message.delete({
      where: { id: messageId },
      select: {
        id: true,
      },
    })
  }
}
