import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class DeleteUser implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.userRepository.remove(id);
  }
}
