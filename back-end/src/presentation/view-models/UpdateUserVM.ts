import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserVM } from './CreateUserVM';

export class UpdateUserVM extends PartialType(CreateUserVM) implements UpdateUserDto {}
