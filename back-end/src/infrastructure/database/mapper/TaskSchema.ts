import { EntitySchema } from 'typeorm';
import { Task } from '../../../domain/models/task/task';
import { User } from '../../../domain/models/user/user';

export const TaskSchema = new EntitySchema<Task>({
	name: 'Task',
	target: Task,
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	relations: {
		user: {
			type: 'many-to-one',
			target: () => User, // UserEntity
			joinColumn: true,
		}
	}
});