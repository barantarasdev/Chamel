import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../../../src/types/strategy';
import { DatabaseService } from '../../../../src/database/database.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const accessToken = req.get('X-Access-Token');
    const isBlacklisted = await this.databaseService.isTokenBlacklisted(
      refreshToken
    );

    if (isBlacklisted) {
      throw new UnauthorizedException();
    }

    return { ...payload, accessToken, refreshToken };
  }
}
