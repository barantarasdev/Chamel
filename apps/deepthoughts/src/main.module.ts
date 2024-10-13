import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [],
})
export class MainModule {}
