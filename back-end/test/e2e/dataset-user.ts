import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserSchema } from '../../src/infrastructure/database/mapper/UserSchema';

export class Dataset1633385179161 implements MigrationInterface {
	name = 'Dataset1633385179161';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.createEntityManager().insert(UserSchema, [
			{
				id: '0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0',
				firstName: 'Tyler',
				lastName: 'Chavez',
				username: 'TylerChavez',
				password: 'password',
			},
			{
				id: '2d94f815-2bf0-47fe-a0e9-e0bec3d3c9bd',
				firstName: 'Ricardo',
				lastName: 'Munoz',
				username: 'RicardoMunoz',
				password: 'password',
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.createEntityManager().remove(UserSchema);
	}
}
