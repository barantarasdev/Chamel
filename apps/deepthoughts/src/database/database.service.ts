import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetUserByEmail, UpdateUserT, UserT } from '../types/user';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import dotenv from 'dotenv';
import {
  CreateRefreshTokenT,
  GetRefreshTokenT,
  UpdateRefreshTokenT,
} from '../types/auth';

dotenv.config({ path: `apps/deepthoughts/.env.test` });

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // User

  async getUserByEmail(email: string): Promise<GetUserByEmail | null> {
    return await this.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async getUser(userId: string): Promise<UserT | null> {
    return await this.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<UserT> {
    return await this.user.create({
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async updateUser({ userId, dto }: UpdateUserT): Promise<UserT> {
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

  async removeUser(userId: string): Promise<Pick<UserT, 'id'> | null> {
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
  ): Promise<GetRefreshTokenT | null> {
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
  }: CreateRefreshTokenT): Promise<void> {
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
  }: UpdateRefreshTokenT): Promise<void> {
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
}
