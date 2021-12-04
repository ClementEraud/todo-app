import { CreateTaskCommand } from '../command/create-task';
import { ITaskWriteRepository } from '../ports/task/TaskWriteRepository.interface';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/models/Task';
import { UseCase } from './UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class AddTaskToUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly userWriteRepository: IUserWriteRepository,
		private readonly taskWriteRepository: ITaskWriteRepository,
	) {}

	async execute(userId: string, taskToAdd: CreateTaskCommand): Promise<User> {
		const user = await this.userReadRepository.findById(userId);

		const task = await this.taskWriteRepository.insert(
			new Task(taskToAdd.title, taskToAdd.description, user),
		);

		user.addTask(task);

		return await this.userWriteRepository.update(user);
	}
}
