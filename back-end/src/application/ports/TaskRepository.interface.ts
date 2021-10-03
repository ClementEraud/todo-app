import { Task } from '../../domain/models/task/task';
import { CreateTaskDto } from '../dto/create-task.dto';

export abstract class ITasksRepository {
	abstract insert(task: CreateTaskDto): Promise<Task>;
}
