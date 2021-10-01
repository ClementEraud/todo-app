import { Module } from '@nestjs/common';
import { UserModule } from './ioc/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
