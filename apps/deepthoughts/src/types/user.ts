import { ApiProperty } from '@nestjs/swagger';
import Chance from 'chance';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import { UpdateUserDTO } from '../controllers/user/dto/user-update.dto';

const chance = new Chance();

export class UserT {
  @ApiProperty({ example: chance.guid(), description: 'User id' })
  id: string;
  @ApiProperty({ example: chance.name(), description: 'User name' })
  name: string;
  @ApiProperty({ example: chance.email(), description: 'User email' })
  email: string;
}

export type CreateUserT = {
  dto: CreateUserDTO;
};

export type UpdateUserT = {
  dto: UpdateUserDTO;
  userId: string;
};
