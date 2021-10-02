import { IUserRepository } from '../../../application/ports/UsersRepository.interface';
import { User } from '../../../domain/models/user/user';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { UserSchema } from '../mapper/UserSchema';
import { CreateUserDto } from '../../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/update-user.dto';

export class UserRepository implements IUserRepository {
    readonly manager: EntityManager;
    readonly queryRunner?: QueryRunner;

    constructor(@InjectConnection() connection: Connection) {
        this.queryRunner = connection.createQueryRunner();
        this.manager = this.queryRunner.manager;
    }

    fromEntity(user: User): User {
        return new User(user.firstName, user.lastName, user.id);
    }

    async insert(user: CreateUserDto): Promise<User> {
        const insertResult = await this.manager.insert(User, user);

        return this.findOne(insertResult.raw.insertId);
    }

    async findAll(): Promise<User[]> {
        const users = await this.manager.find(UserSchema);
        return users.map(this.fromEntity);
    }

    async findOne(userId: number): Promise<User> {
       const userEntity = await this.manager.findOne(UserSchema, userId, { relations: ['tasks'] });
       return this.fromEntity(userEntity);
    }

    async update(userId: number, updateUser: UpdateUserDto): Promise<User> {
        await this.manager.update(UserSchema, {id: userId}, updateUser);
        return this.findOne(userId);
    }

    async remove(userId: number): Promise<boolean> {
        try {
            await this.manager.delete(UserSchema, {id: userId});
        }
        catch {
            return false;
        }

        return true;
    }

    async save(user: User): Promise<User> {
        return this.manager.save(user);
    }
}
