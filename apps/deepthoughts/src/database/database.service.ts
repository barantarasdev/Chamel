import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import { CreateMessageDTO } from '../controllers/message/dto/message-create.dto';
import {
  GetUserByEmailI,
  UpdateUserI,
  UserC,
} from '../controllers/user/interfaces/user.interface';
import {
  CreateRefreshTokenI,
  GetRefreshTokenI,
  UpdateRefreshTokenI,
} from '../controllers/auth/interfaces/auth.interface';
import {
  MessageC,
  UpdateMessageT,
} from '../controllers/message/interfaces/message.interface';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // User

  async getUserByEmail(email: string): Promise<GetUserByEmailI | null> {
    return await this.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async getUser(userId: string): Promise<UserC | null> {
    return await this.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<UserC> {
    return await this.user.create({
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async updateUser({ userId, dto }: UpdateUserI): Promise<UserC> {
    return await this.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async removeUser(userId: string): Promise<Pick<UserC, 'id'> | null> {
    return await this.user.delete({
      where: { id: userId },
      select: {
        id: true,
      },
    });
  }

  // Token

  async getRefreshTokenByToken(
    refreshToken: string
  ): Promise<GetRefreshTokenI | null> {
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
    });
  }

  async createRefreshToken({
    userId,
    refreshToken,
  }: CreateRefreshTokenI): Promise<void> {
    await this.token.create({
      data: {
        userId,
        refreshToken,
      },
    });
  }

  async updateRefreshToken({
    refreshToken,
    newRefreshToken,
  }: UpdateRefreshTokenI): Promise<void> {
    await this.token.update({
      where: { refreshToken },
      data: {
        refreshToken: newRefreshToken,
      },
    });
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    await this.token.delete({
      where: { refreshToken },
    });
  }

  async addTokenToBlacklist(token: string): Promise<void> {
    await this.token_blacklist.create({
      data: {
        token,
      },
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return !!(await this.token_blacklist.findUnique({
      where: {
        token,
      },
    }));
  }

  // Message

  async getMessage(messageId: string): Promise<MessageC | null> {
    return await this.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        text: true,
        senderId: true,
        receiverId: true,
      },
    });
  }

  async createMessage(dto: CreateMessageDTO): Promise<MessageC> {
    return await this.message.create({
      data: dto,
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        text: true,
      },
    });
  }

  async updateMessage({ messageId, dto }: UpdateMessageT): Promise<MessageC> {
    return await this.message.update({
      where: { id: messageId },
      data: dto,
      select: {
        id: true,
        text: true,
        senderId: true,
        receiverId: true,
      },
    });
  }

  async removeMessage(messageId: string): Promise<Pick<MessageC, 'id'> | null> {
    return await this.message.delete({
      where: { id: messageId },
      select: {
        id: true,
      },
    });
  }
}
