import { CreateUserVM } from './CreateUserVM';
import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

export class UpdateUserVM
	extends PartialType(CreateUserVM)
	implements UpdateUserDto {}
