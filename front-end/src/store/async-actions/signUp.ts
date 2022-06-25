import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { ApiError } from '../../providers/ApiError';
import { CreateUserCommand } from '../../core/commands/CreateUserCommand';
import { IUserService } from '../../core/ports/UserService.interface';
import { TodoStore } from '../store';

export const signUp = (userService: IUserService) =>
	createAsyncAction(
		async ({ createUserCommand }: { createUserCommand: CreateUserCommand }) => {
			try {
				await userService.signUp(createUserCommand);
				const token = await userService.login(
					createUserCommand.username as string,
					createUserCommand.password as string,
				);
				return successResult(token);
			} catch (err) {
				const error = err as ApiError;
				return errorResult([error.code], error.message, error);
			}
		},
		{
			postActionHook: ({ result }) => {
				if (!result.error) {
					TodoStore.update(s => {
						s.token = result.payload;
					});
				}
			},
		},
	);
