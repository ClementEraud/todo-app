import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AddTaskToUser } from '../../application/use_cases/AddTaskToUser';
import { CreateTaskVM } from '../view-models/CreateTaskVM';
import { CreateUser } from '../../application/use_cases/CreateUser';
import { CreateUserVM } from '../view-models/CreateUserVM';
import { LoginUser } from '../../application/use_cases/LoginUser';
import { UserLoginVM } from '../view-models/UserLoginVM';
import { UserVM } from '../view-models/UserVM';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private readonly createUser: CreateUser,
		private readonly addTaskUser: AddTaskToUser,
		private readonly loginUser: LoginUser,
	) {}

	@Post()
	@ApiCreatedResponse({
		description: 'The User has been successfully created.',
		type: UserVM,
	})
	async create(@Body() createUser: CreateUserVM): Promise<UserVM> {
		return UserVM.toViewModel(await this.createUser.execute(createUser));
	}

	@Post(':id/add-task')
	@ApiCreatedResponse({
		description: 'Add task to user.',
		type: UserVM,
	})
	async addTask(
		@Param('id') userId: string,
		@Body() createTask: CreateTaskVM,
	): Promise<UserVM> {
		return UserVM.toViewModel(
			await this.addTaskUser.execute(userId, createTask),
		);
	}

	@Post('login')
	@ApiCreatedResponse({
		description: 'Login user.',
		type: UserVM,
	})
	@HttpCode(200)
	async login(@Body() userLogin: UserLoginVM): Promise<UserVM> {
		return UserVM.toViewModel(
			await this.loginUser.execute(userLogin.username, userLogin.password),
		);
	}
}
