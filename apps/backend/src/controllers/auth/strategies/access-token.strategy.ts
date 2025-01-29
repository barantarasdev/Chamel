import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DatabaseService } from '../../../database/database.service'
import { Request } from 'express'
import { IJwtPayload } from '../interfaces/auth.interface'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    })
  }

  async validate(req: Request, payload: IJwtPayload) {
    const token = req.get('Authorization').replace('Bearer', '').trim()

    const isBlacklisted = await this.databaseService.isTokenBlacklisted(token)

    if (isBlacklisted) {
      throw new UnauthorizedException()
    }

    return payload
  }
}
