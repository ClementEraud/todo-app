import { CreateTaskDto } from '../command/create-task.dto';
import { ITaskWriteRepository } from '../ports/task/TaskWriteRepository.interface';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from './UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class AddTaskToUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly taskWriteRepository: ITaskWriteRepository,
		private readonly userWriteRepository: IUserWriteRepository,
	) {}

	async execute(userId: string, taskToAdd: CreateTaskDto): Promise<User> {
		const user = await this.userReadRepository.findOne(userId);
		const task = await this.taskWriteRepository.insert(taskToAdd);
		user.addTask(task);
		await this.userWriteRepository.save(user);
		return await this.userReadRepository.findOne(userId);
	}
}
