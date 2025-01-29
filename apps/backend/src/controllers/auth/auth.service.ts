import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { SignInDTO } from './dto/sign-in.dto'
import { SignUpDTO } from './dto/sign-up.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ERRORS } from '../../constants/errors'
import { CTokens } from './interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService, private jwtService: JwtService) {}

  async getTokens(id: string, email: string): Promise<CTokens> {
    const payload = {
      sub: id,
      email,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async signIn(dto: SignInDTO): Promise<CTokens> {
    const { email, password } = dto

    const user = await this.databaseService.getUserByEmail(email)

    if (!user) {
      throw new NotFoundException(ERRORS.USER_DOES_NOT_EXISTS)
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      throw new BadRequestException(ERRORS.INCORRECT_PASSWORD)
    }

    const { accessToken, refreshToken } = await this.getTokens(user.id, email)
    await this.databaseService.createRefreshToken({
      userId: user.id,
      refreshToken,
    })

    return { refreshToken, accessToken }
  }

  async signUp(dto: SignUpDTO): Promise<CTokens> {
    const { email, name, password } = dto

    const user = await this.databaseService.getUserByEmail(dto.email)

    if (user) {
      throw new ConflictException(ERRORS.USER_ALREADY_EXISTS)
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS))

    const { id } = await this.databaseService.createUser({
      name,
      email,
      password: hashedPassword,
    })
    const { refreshToken, accessToken } = await this.getTokens(id, email)
    await this.databaseService.createRefreshToken({
      userId: id,
      refreshToken,
    })

    return { refreshToken, accessToken }
  }

  async refresh(refreshToken: string | null): Promise<CTokens> {
    const currentRefreshToken = await this.databaseService.getRefreshTokenByToken(refreshToken)

    if (!currentRefreshToken) {
      throw new UnauthorizedException(ERRORS.TOKEN_DOES_NOT_EXISTS)
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      currentRefreshToken.userId,
      currentRefreshToken.user.email,
    )
    await this.databaseService.updateRefreshToken({
      refreshToken,
      newRefreshToken,
    })

    return {
      refreshToken,
      accessToken,
    }
  }

  async signOut(accessToken: string | null, refreshToken: string | null): Promise<void> {
    if (refreshToken) {
      await this.databaseService.removeRefreshToken(refreshToken)
      await this.databaseService.addTokenToBlacklist(refreshToken)
    }

    if (accessToken) {
      await this.databaseService.addTokenToBlacklist(accessToken)
    }
  }
}
