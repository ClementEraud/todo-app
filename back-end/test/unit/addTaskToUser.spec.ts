import { AddTaskToUser } from '../../src/application/use_cases/AddTaskToUser';
import { MealPlanner } from './../../src/domain/models/MealPlanner';
import { Task } from '../../src/domain/models/Task';
import { TaskWriteRepository } from '../../src/consumed/in_memory/repositories/task/TaskWriteRepository';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/consumed/in_memory/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../../src/consumed/in_memory/repositories/user/UserWriteRepository';

describe('AddTaskToUser', () => {
	let useCase: AddTaskToUser;
	const userList: User[] = [
		new User(
			'Verna',
			'Tran',
			'username',
			'password',
			new MealPlanner(),
			[],
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		),
	];
	const taskList: Task[] = [];

	beforeAll(async () => {
		useCase = new AddTaskToUser(
			new UserReadRepository(userList),
			new UserWriteRepository(userList),
			new TaskWriteRepository(taskList),
		);
	});

	it('GIVEN a valid user SHOULD insert a new user and return it', async () => {
		const user = await useCase.execute('df15fecb-2baf-419f-858e-abae3ac1454b', {
			title: 'Test',
			description: 'Todo test',
		});

		expect(user.id).toBe('df15fecb-2baf-419f-858e-abae3ac1454b');
		expect(user.tasks.length).toBe(1);
		expect(taskList.length).toBe(1);

		const task = taskList[0];

		expect(task.id).toBeDefined();
		expect(task.title).toBe('Test');
		expect(task.description).toBe('Todo test');
		expect(task.user).toBeDefined();
		expect(task.user.id).toBe('df15fecb-2baf-419f-858e-abae3ac1454b');
	});
});
