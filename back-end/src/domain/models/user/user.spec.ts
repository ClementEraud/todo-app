import { Task } from '../task/task';
import { User } from './user';

describe('domain/User', () => {
	describe('constructor', () => {
		it('should create a new User', () => {
			// GIVEN
			const firstName = 'Karl';
			const lastName = 'Marx';

			// WHEN
			const user = new User(firstName, lastName, 1);

			// THEN
			expect(user.id).toBe(1);
			expect(user.firstName).toBe('Karl');
			expect(user.lastName).toBe('Marx');
		});
	});

	describe('addTask', () => {
		it('should add a task to empty task list of user', () => {
			// GIVEN
			const user = new User('Joel', 'Knight', 1);
			const task = new Task('Task 1', 'Description', 1);

			// WHEN
			user.addTask(task);

			// THEN
			expect(user.tasks.length).toBe(1);
		});
		it('should add both tasks to task list of user', () => {
			// GIVEN
			const user = new User('Joel', 'Knight', 1);
			const task = new Task('Task 1', 'Description', 1);
			const task2 = new Task('Task 2', 'Description', 2);

			// WHEN
			user.addTask(task);
			user.addTask(task2);

			// THEN
			expect(user.tasks.length).toBe(2);
		});
	})
});
