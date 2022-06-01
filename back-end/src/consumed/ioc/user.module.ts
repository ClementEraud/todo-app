import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { EncryptionService } from '../services/EncryptionService';
import { GetMealPlannerOfUser } from '../../application/use_cases/GetMealPlannerOfUser';
import { IEncryptionService } from '../../application/ports/services/EncryptionService';
import { ITaskWriteRepository } from '../../application/ports/task/TaskWriteRepository.interface';
import { IUserReadRepository } from '../../application/ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../../application/ports/user/UserWriteRepository.interface';
import { JwtModule } from '@nestjs/jwt';
import { LoginUser } from '../../application/use_cases/LoginUser';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TaskWriteRepository } from '../database/repositories/task/TaskWriteRepository';
import { UserController } from '../../consumers/rest_api/controller/user.controller';
import { UserReadRepository } from '../database/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../database/repositories/user/UserWriteRepository';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'secret',
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [UserController],
	providers: [
		CreateUser,
		AddTaskToUser,
		LoginUser,
		GetMealPlannerOfUser,
		{ provide: IUserReadRepository, useClass: UserReadRepository },
		{ provide: IUserWriteRepository, useClass: UserWriteRepository },
		{ provide: ITaskWriteRepository, useClass: TaskWriteRepository },
		{ provide: IEncryptionService, useClass: EncryptionService },
	],
})
export class UserModule {}
