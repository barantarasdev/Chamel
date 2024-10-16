import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from '../../database/database.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    DatabaseService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
})
export class AuthModule {}
