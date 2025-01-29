import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'
import { DatabaseService } from '../database/database.service'
import { NextFunction } from 'express'
import { ERRORS } from '../constants/errors'

export const WsAuthAccessToken = (jwtService: JwtService, databaseService: DatabaseService) => {
  return async (socket: Socket, next: NextFunction) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.token

    if (!token) {
      throw new UnauthorizedException(ERRORS.TOKEN_IS_MISSING)
    }

    try {
      const tokenPayload = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      })

      if (!tokenPayload) {
        throw new UnauthorizedException(ERRORS.TOKEN_IS_REVOKED)
      }

      const isBlacklisted = await databaseService.isTokenBlacklisted(token)

      if (isBlacklisted) {
        throw new UnauthorizedException(ERRORS.TOKEN_IS_REVOKED)
      }

      socket['user'] = tokenPayload

      next()
    } catch (error) {
      next(new UnauthorizedException(ERRORS.UNAUTHORIZED))
    }
  }
}
