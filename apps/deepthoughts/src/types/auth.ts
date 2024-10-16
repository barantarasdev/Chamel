import { ApiProperty } from '@nestjs/swagger';
import Chance from 'chance';
import { UserT } from './user';

const chance = new Chance();

export class TokenT {
  @ApiProperty({ example: chance.hash(), description: 'accessToken' })
  accessToken: string;
  @ApiProperty({ example: chance.hash(), description: 'refreshToken' })
  refreshToken: string;
}

export type CreateRefreshTokenT = {
  userId: string;
  refreshToken: string;
};

export type GetRefreshTokenT = {
  userId: string;
  user: Pick<UserT, 'email'>;
};

export type UpdateRefreshTokenT = {
  refreshToken: string;
  newRefreshToken: string;
};
