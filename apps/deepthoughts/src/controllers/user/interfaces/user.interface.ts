import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/user-create.dto';
import { UpdateUserDTO } from '../dto/user-update.dto';

export class UserC {
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

export interface CreateUserI {
  dto: CreateUserDTO;
}

export interface UpdateUserI {
  dto: UpdateUserDTO;
  userId: string;
}

export interface GetUserByEmailI {
  id: string;
  password: string;
}
