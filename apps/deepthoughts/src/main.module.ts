import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule, AuthModule],
  providers: [DatabaseService],
  controllers: [],
})
export class MainModule {}
