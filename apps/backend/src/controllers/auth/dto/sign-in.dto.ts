import { ApiProperty } from '@nestjs/swagger'

export class SignInDTO {
  @ApiProperty({ example: 'mail@mail.com', description: 'User email' })
  email: string
  @ApiProperty({ example: 'password', description: 'User password' })
  password: string
}
