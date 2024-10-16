import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { SignInDTO } from './dto/sign-in.dto';
import { TokenT } from '../../types/auth';
import { SignUpDTO } from './dto/sign-up.dto';
import { errors } from '@libs/core';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserD } from '../../types/decorators';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async getTokens(id: string, email: string): Promise<TokenT> {
    const payload = {
      sub: id,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(dto: SignInDTO): Promise<TokenT> {
    const { email, password } = dto;

    const user = await this.databaseService.getUserByEmail(email);

    if (!user) {
      console.log(errors.USER_DOES_NOT_EXISTS);

      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      console.log(errors.INCORRECT_PASSWORD);

      return;
    }

    const { accessToken, refreshToken } = await this.getTokens(user.id, email);
    await this.databaseService.createRefreshToken({
      userId: user.id,
      refreshToken,
    });

    return { refreshToken, accessToken };
  }

  async signUp(dto: SignUpDTO): Promise<TokenT> {
    const { email, name, password } = dto;

    const user = await this.databaseService.getUserByEmail(dto.email);

    if (user) {
      console.log(errors.USER_ALREADY_EXISTS);

      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_OR_ROUNDS)
    );

    const { id } = await this.databaseService.createUser({
      name,
      email,
      password: hashedPassword,
    });
    const { refreshToken, accessToken } = await this.getTokens(id, email);
    await this.databaseService.createRefreshToken({
      userId: id,
      refreshToken,
    });

    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string | null): Promise<TokenT> {
    const currentRefreshToken =
      await this.databaseService.getRefreshTokenByToken(refreshToken);

    if (!currentRefreshToken) {
      console.log(errors.TOKEN_DOES_NOT_EXISTS);

      return;
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      currentRefreshToken.userId,
      currentRefreshToken.user.email
    );
    await this.databaseService.updateRefreshToken({
      refreshToken,
      newRefreshToken,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async signOut(
    accessToken: string | null,
    refreshToken: string | null
  ): Promise<void> {
    if (refreshToken) {
      await this.databaseService.removeRefreshToken(refreshToken);
      await this.databaseService.addTokenToBlacklist(refreshToken);
    }

    if (accessToken) {
      await this.databaseService.addTokenToBlacklist(accessToken);
    }
  }
}
