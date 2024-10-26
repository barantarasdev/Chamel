import { ApiProperty } from '@nestjs/swagger';
import { UserT } from './user';

export class TokenT {
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'accessToken',
  })
  accessToken: string;
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'refreshToken',
  })
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
