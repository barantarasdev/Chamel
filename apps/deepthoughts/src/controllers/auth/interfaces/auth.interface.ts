import { ApiProperty } from '@nestjs/swagger';
import { UserC } from '../../user/interfaces/user.interface';

export class TokenC {
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

export interface CreateRefreshTokenI {
  userId: string;
  refreshToken: string;
}

export interface GetRefreshTokenI {
  userId: string;
  user: Pick<UserC, 'email'>;
}

export interface UpdateRefreshTokenI {
  refreshToken: string;
  newRefreshToken: string;
}

export interface JwtPayloadI {
  [key: string]: unknown;
  sub: string;
  email: string;
}
