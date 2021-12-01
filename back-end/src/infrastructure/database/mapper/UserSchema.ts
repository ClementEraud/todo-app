import { EntitySchema } from 'typeorm';
import { Task } from '../../../domain/models/Task';
import { User } from '../../../domain/models/User';

export const UserSchema = new EntitySchema<User>({
	name: 'User',
	target: User,
	columns: {
		id: {
			type: String,
			primary: true,
			generated: true,
		},
		firstName: {
			type: String,
			nullable: false,
		},
		lastName: {
			type: String,
			nullable: false,
		},
		username: {
			type: String,
			nullable: false,
		},
		password: {
			type: String,
			nullable: false,
		},
	},
	relations: {
		tasks: {
			type: 'one-to-many',
			target: () => Task, // TaskEntity
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			inverseSide: 'user',
			joinTable: true,
		},
	},
});
