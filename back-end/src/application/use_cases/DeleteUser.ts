import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class DeleteUser implements UseCase {
	constructor(private readonly userWriteRepository: IUserWriteRepository) {}

	async execute(id: string): Promise<boolean> {
		return this.userWriteRepository.remove(id);
	}
}
