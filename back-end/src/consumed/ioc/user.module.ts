import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { EncryptionService } from '../services/EncryptionService';
import { GetUserFromId } from '../../application/use_cases/GetUserFromId';
import { IEncryptionService } from '../../application/ports/services/EncryptionService';
import { ITaskWriteRepository } from '../../application/ports/task/TaskWriteRepository.interface';
import { IUserReadRepository } from '../../application/ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../../application/ports/user/UserWriteRepository.interface';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../application/auth/jwt.strategy';
import { LoginUser } from '../../application/use_cases/LoginUser';
import { MealOfTheDaySchema } from '../database/mapper/MealOfTheDaySchema';
import { MealPlannerSchema } from '../database/mapper/MealPlannerSchema';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TaskSchema } from '../database/mapper/TaskSchema';
import { TaskWriteRepository } from '../database/repositories/task/TaskWriteRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../consumers/rest_api/controller/user.controller';
import { UserReadRepository } from '../database/repositories/user/UserReadRepository';
import { UserSchema } from '../database/mapper/UserSchema';
import { UserWriteRepository } from '../database/repositories/user/UserWriteRepository';
import { jwtConstants } from '../../application/auth/constants';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserSchema]),
		TypeOrmModule.forFeature([TaskSchema]),
		TypeOrmModule.forFeature([MealOfTheDaySchema]),
		TypeOrmModule.forFeature([MealPlannerSchema]),
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '3600s' },
		}),
	],
	controllers: [UserController],
	providers: [
		CreateUser,
		AddTaskToUser,
		LoginUser,
		GetUserFromId,
		{ provide: IUserReadRepository, useClass: UserReadRepository },
		{ provide: IUserWriteRepository, useClass: UserWriteRepository },
		{ provide: ITaskWriteRepository, useClass: TaskWriteRepository },
		{ provide: IEncryptionService, useClass: EncryptionService },
		JwtStrategy,
	],
})
export class UserModule {}
