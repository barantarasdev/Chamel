import { Module } from '@nestjs/common'
import { AuthModule } from './controllers/auth/auth.module'
import { MessageModule } from './controllers/message/message.module'
import { DatabaseModule } from './database/database.module'
import { GateWaysModule } from './gateways/gateways.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    MessageModule,
    GateWaysModule,
    ConfigModule.forRoot({
      envFilePath: `apps/backend/.env.${process.env.NODE_ENV}`,
    }),
  ],
})
export class MainModule {}
