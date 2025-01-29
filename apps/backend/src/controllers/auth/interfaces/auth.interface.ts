import { ApiProperty } from '@nestjs/swagger'

export class CUser {
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'User id',
  })
  id: string
  @ApiProperty({ example: 'name', description: 'User name' })
  name: string
  @ApiProperty({ example: 'mail@mail.com', description: 'User email' })
  email: string
  @ApiProperty({ example: 'password', description: 'User password' })
  password: string
}

export class CTokens {
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'accessToken',
  })
  accessToken: string
  @ApiProperty({
    example: 'fc6500f7-32f7-4eaf-950b-e8513e844f9a',
    description: 'refreshToken',
  })
  refreshToken: string
}

export interface ICreateRefreshToken {
  userId: string
  refreshToken: string
}

export interface IGetRefreshToken {
  userId: string
  user: Pick<CUser, 'email'>
}

export interface IUpdateRefreshToken {
  refreshToken: string
  newRefreshToken: string
}

export interface IJwtPayload {
  [key: string]: unknown
  sub: string
  email: string
}
