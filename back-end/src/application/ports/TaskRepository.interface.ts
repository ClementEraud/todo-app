import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../../domain/models/Task';

export abstract class ITasksRepository {
	abstract insert(task: CreateTaskDto): Promise<Task>;
}
