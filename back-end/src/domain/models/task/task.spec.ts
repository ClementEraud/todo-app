import { Task } from './task';

describe('domain/Task', () => {
	describe('constructor', () => {
		it('should create a new task', () => {
			// GIVEN
			const title = 'Task 1';
			const description = 'Very important';

			// WHEN
			const task = new Task( title, description, 1);

			// THEN
			expect(task.id).toBe(1);
			expect(task.title).toBe('Task 1');
			expect(task.description).toBe('Very important');
		});
	});
});