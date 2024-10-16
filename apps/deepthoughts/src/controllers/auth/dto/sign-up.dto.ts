import { ApiProperty } from '@nestjs/swagger';
import Chance from 'chance';

const chance = new Chance();

export class SignUpDTO {
  @ApiProperty({ example: chance.name(), description: 'User name' })
  name: string;
  @ApiProperty({ example: chance.email(), description: 'User email' })
  email: string;
  @ApiProperty({ example: chance.string(), description: 'User password' })
  password: string;
}
