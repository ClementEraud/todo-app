import { Module } from '@nestjs/common';
import { UserModule } from './ioc/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
