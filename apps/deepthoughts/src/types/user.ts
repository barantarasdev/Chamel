import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import { UpdateUserDTO } from '../controllers/user/dto/user-update.dto';

export class UserT {
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'User id',
  })
  id: string;
  @ApiProperty({ example: 'name', description: 'User name' })
  name: string;
  @ApiProperty({ example: 'mail@mail.com', description: 'User email' })
  email: string;
}

export type CreateUserT = {
  dto: CreateUserDTO;
};

export type UpdateUserT = {
  dto: UpdateUserDTO;
  userId: string;
};

export type GetUserByEmail = {
  id: string;
  password: string;
};
