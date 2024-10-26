import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({ example: 'name', description: 'User name' })
  name?: string;
  @ApiProperty({ example: 'mail@mail.com', description: 'User email' })
  email?: string;
  @ApiProperty({ example: 'password', description: 'User password' })
  password?: string;
}
