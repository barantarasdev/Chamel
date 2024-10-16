import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../../src/types/strategy';
import { DatabaseService } from '../../../../src/database/database.service';
import { Request } from 'express';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const accessToken = req.get('Authorization').replace('Bearer', '').trim();
    const isBlacklisted = await this.databaseService.isTokenBlacklisted(
      accessToken
    );

    if (isBlacklisted) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}