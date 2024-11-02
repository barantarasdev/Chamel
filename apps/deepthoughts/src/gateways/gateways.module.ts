import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({})],
  providers: [MessageGateway],
})
export class GateWaysModule {}
