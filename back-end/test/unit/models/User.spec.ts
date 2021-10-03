import { Task } from '../../../src/domain/models/Task';
import { User } from '../../../src/domain/models/User';

describe('domain/User', () => {
	describe('constructor', () => {
		it('should create a new User', () => {
			// GIVEN
			const firstName = 'Karl';
			const lastName = 'Marx';

			// WHEN
			const user = new User(1, firstName, lastName);

			// THEN
			expect(user.id).toBe(1);
			expect(user.firstName).toBe('Karl');
			expect(user.lastName).toBe('Marx');
		});
	});

	describe('addTask', () => {
		it('should add a task to empty task list of user', () => {
			// GIVEN
			const user = new User(1, 'Joel', 'Knight');
			const task = new Task(1, 'Task 1', 'Description');

			// WHEN
			user.addTask(task);

			// THEN
			expect(user.tasks.length).toBe(1);
		});
		it('should add both tasks to task list of user', () => {
			// GIVEN
			const user = new User(1, 'Joel', 'Knight');
			const task = new Task(1, 'Task 1', 'Description');
			const task2 = new Task(1, 'Task 2', 'Description');

			// WHEN
			user.addTask(task);
			user.addTask(task2);

			// THEN
			expect(user.tasks.length).toBe(2);
		});
	});
});
