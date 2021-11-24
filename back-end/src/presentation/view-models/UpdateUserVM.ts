import { CreateUserVM } from './CreateUserVM';
import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserCommand } from '../../application/command/update-user';

export class UpdateUserVM
	extends PartialType(CreateUserVM)
	implements UpdateUserCommand {}
