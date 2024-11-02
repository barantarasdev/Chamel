import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDTO } from './dto/user-create.dto';
import { UpdateUserI, UserC } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async getUser(userId: string | null): Promise<UserC | null> {
    return await this.databaseService.getUser(userId);
  }

  async createUser(dto: CreateUserDTO): Promise<UserC> {
    return await this.databaseService.createUser(dto);
  }

  async updateUser({ userId, dto }: UpdateUserI): Promise<UserC> {
    return await this.databaseService.updateUser({ dto, userId });
  }

  async removeUser(userId: string): Promise<Pick<UserC, 'id'> | null> {
    return await this.databaseService.removeUser(userId);
  }
}
