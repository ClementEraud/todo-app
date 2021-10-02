import { EntitySchema } from 'typeorm';
import { Task } from '../../../domain/models/task/task';
import { User } from '../../../domain/models/user/user';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  relations: {
    tasks: {
        type: 'one-to-many',
        target: () => Task, // TaskEntity
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        inverseSide: 'user',
    }
  }
});