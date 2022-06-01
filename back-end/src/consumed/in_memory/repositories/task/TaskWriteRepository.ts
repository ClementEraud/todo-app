import { ITaskWriteRepository } from '../../../../application/ports/task/TaskWriteRepository.interface';
import { Task } from '../../../../domain/models/Task';

export class TaskWriteRepository implements ITaskWriteRepository {
	constructor(private taskList: Task[]) {}

	async insert(taskToCreate: Task): Promise<Task> {
		this.taskList.push(taskToCreate);
		return taskToCreate;
	}
}
