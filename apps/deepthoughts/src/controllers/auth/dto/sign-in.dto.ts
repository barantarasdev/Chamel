import { ApiProperty } from '@nestjs/swagger';
import Chance from 'chance';

const chance = new Chance();

export class SignInDTO {
  @ApiProperty({ example: chance.email(), description: 'User email' })
  email: string;
  @ApiProperty({ example: chance.string(), description: 'User password' })
  password: string;
}
