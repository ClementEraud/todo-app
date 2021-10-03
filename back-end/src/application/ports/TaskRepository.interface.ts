import { Task } from '../../domain/models/Task';
import { CreateTaskDto } from '../dto/create-task.dto';

export abstract class ITasksRepository {
	abstract insert(task: CreateTaskDto): Promise<Task>;
}
