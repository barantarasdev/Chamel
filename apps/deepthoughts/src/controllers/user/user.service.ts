import { Injectable } from '@nestjs/common';
import { UpdateUserT, UserT } from '../../types/user';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDTO } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async getUser(userId: string | null): Promise<UserT | null> {
    return await this.databaseService.getUser(userId);
  }

  async createUser(dto: CreateUserDTO): Promise<UserT> {
    return await this.databaseService.createUser(dto);
  }

  async updateUser({ userId, dto }: UpdateUserT): Promise<UserT> {
    return await this.databaseService.updateUser({ dto, userId });
  }

  async removeUser(userId: string): Promise<Pick<UserT, 'id'> | null> {
    return await this.databaseService.removeUser(userId);
  }
}
