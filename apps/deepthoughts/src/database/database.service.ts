import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserT, UserT } from '../types/user';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
dotenv.config({ path: `apps/deepthoughts/.env.${env}` });

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // User

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
}
