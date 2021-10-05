import { Task } from '../../../src/domain/models/Task';

describe('domain/Task', () => {
	describe('constructor', () => {
		it('should create a new task', () => {
			// GIVEN
			const title = 'Task 1';
			const description = 'Very important';
			const id = '2130a29b-d5f7-4dbc-b6d2-ab035ce10bb4';

			// WHEN
			const task = new Task(title, description, id);

			// THEN
			expect(task.id).toBe(id);
			expect(task.title).toBe('Task 1');
			expect(task.description).toBe('Very important');
		});
	});
});
