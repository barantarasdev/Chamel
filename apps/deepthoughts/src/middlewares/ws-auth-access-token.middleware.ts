import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { DatabaseService } from '../database/database.service';
import { NextFunction } from 'express';
import { errors } from '@libs/core';

export const WsAuthAccessToken = (
  jwtService: JwtService,
  databaseService: DatabaseService
) => {
  return async (socket: Socket, next: NextFunction) => {
    const token = socket.handshake.headers.token as string;

    if (!token) {
      throw new UnauthorizedException(errors.TOKEN_IS_MISSING);
    }

    try {
      const tokenPayload = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      });

      if (!tokenPayload) {
        throw new UnauthorizedException(errors.TOKEN_IS_REVOKED);
      }

      const isBlacklisted = await databaseService.isTokenBlacklisted(token);

      if (isBlacklisted) {
        throw new UnauthorizedException(errors.TOKEN_IS_REVOKED);
      }

      socket['user'] = tokenPayload;

      next();
    } catch (error) {
      next(new UnauthorizedException(errors.UNAUTHORIZED));
    }
  };
};
