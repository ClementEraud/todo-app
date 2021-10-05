import { Task } from '../../../src/domain/models/Task';
import { User } from '../../../src/domain/models/User';

describe('domain/User', () => {
	describe('constructor', () => {
		it('should create a new User', () => {
			// GIVEN
			const firstName = 'Karl';
			const lastName = 'Marx';

			// WHEN
			const user = new User(firstName, lastName);

			// THEN
			expect(user.id).toBeDefined();
			expect(user.firstName).toBe('Karl');
			expect(user.lastName).toBe('Marx');
		});

		it('should create a new User with defined ID', () => {
			// GIVEN
			const firstName = 'Karl';
			const lastName = 'Marx';
			const id = '906fb01c-bf2d-4585-a03d-d525fdacd408';

			// WHEN
			const user = new User(firstName, lastName, [], id);

			// THEN
			expect(user.id).toBe(id);
			expect(user.firstName).toBe('Karl');
			expect(user.lastName).toBe('Marx');
		});
	});

	describe('addTask', () => {
		it('should add a task to empty task list of user', () => {
			// GIVEN
			const user = new User('Joel', 'Knight');
			const task = new Task('Task 1', 'Description');

			// WHEN
			user.addTask(task);

			// THEN
			expect(user.tasks.length).toBe(1);
		});
		it('should add both tasks to task list of user', () => {
			// GIVEN
			const user = new User('Joel', 'Knight');
			const task = new Task('Task 1', 'Description');
			const task2 = new Task('Task 2', 'Description');

			// WHEN
			user.addTask(task);
			user.addTask(task2);

			// THEN
			expect(user.tasks.length).toBe(2);
		});
	});
});
