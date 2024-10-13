import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from '../../database/database.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, DatabaseService],
  controllers: [UserController],
})
export class UserModule {}
