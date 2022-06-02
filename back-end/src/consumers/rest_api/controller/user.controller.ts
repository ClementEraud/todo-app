import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AddTaskToUser } from '../../../application/use_cases/AddTaskToUser';
import { CreateTaskInput } from '../inputs/CreateTaskInput';
import { CreateUser } from '../../../application/use_cases/CreateUser';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { GetMealPlannerOfUser } from '../../../application/use_cases/GetMealPlannerOfUser';
import { JwtAuthGuard } from '../../../application/auth/jwt-auth.guard';
import { LoginUser } from '../../../application/use_cases/LoginUser';
import { MealPlannerVM } from '../view-models/MealPlannerVM';
import { UserLoginInput } from '../inputs/UserLoginInput';
import { UserVM } from '../view-models/UserVM';


@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private readonly createUser: CreateUser,
		private readonly addTaskUser: AddTaskToUser,
		private readonly loginUser: LoginUser,
		private readonly getMealPlannerOfUser: GetMealPlannerOfUser,
	) {}

	// Routes without authentication
	@Post()
	@ApiCreatedResponse({
		description: 'The User has been successfully created.',
		type: UserVM,
	})
	async create(@Body() createUser: CreateUserInput): Promise<UserVM> {
		return new UserVM(await this.createUser.execute(createUser));
	}

	@Post('login')
	@ApiCreatedResponse({
		description: 'Login user.',
		type: UserVM,
	})
	@HttpCode(200)
	async login(@Body() userLogin: UserLoginInput): Promise<string> {
		return await this.loginUser.execute(userLogin.username, userLogin.password);
	}


	// Routes with authentication
	@UseGuards(JwtAuthGuard)
	@Post('me/add-task')
	@ApiCreatedResponse({
		description: 'Add task to user.',
		type: UserVM,
	})
	async addTask(
		@Request() req,
		@Body() createTask: CreateTaskInput,
	): Promise<UserVM> {
		return new UserVM(await this.addTaskUser.execute(req.user.userId, createTask));
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/get-meal-planner')
	@ApiCreatedResponse({
		description: 'Meal Planner Of User',
		type: MealPlannerVM,
	})
	@HttpCode(200)
	async getMealPlanner(@Request() req): Promise<MealPlannerVM> {
		return new MealPlannerVM(await this.getMealPlannerOfUser.execute(req.user.userId));
	}
}
