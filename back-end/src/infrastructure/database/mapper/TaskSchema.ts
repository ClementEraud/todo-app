import { EntitySchema } from 'typeorm';
import { Task } from '../../../domain/models/Task';
import { User } from '../../../domain/models/User';

export const TaskSchema = new EntitySchema<Task>({
	name: 'Task',
	target: Task,
	columns: {
		id: {
			type: String,
			primary: true,
		},
		title: {
			type: String,
			nullable: false,
		},
		description: {
			type: String,
			nullable: false,
		},
	},
	relations: {
		user: {
			type: 'many-to-one',
			target: () => User, // UserEntity
			joinColumn: true,
			joinTable: true,
		},
	},
});
