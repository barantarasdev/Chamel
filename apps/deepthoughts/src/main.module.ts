import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { DatabaseService } from './database/database.service';
import { MessageModule } from './controllers/message/message.module';

@Module({
  imports: [UserModule, AuthModule, MessageModule],
  providers: [DatabaseService],
  controllers: [],
})
export class MainModule {}
