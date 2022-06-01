import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserSchema } from '../../src/consumed/database/mapper/UserSchema';

export class Dataset1633385179161 implements MigrationInterface {
	name = 'Dataset1633385179161';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.createEntityManager().save(UserSchema, [
			{
				id: '0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0',
				firstName: 'Tyler',
				lastName: 'Chavez',
				username: 'TylerChavez',
				password: bcrypt.hashSync('password', 10),
				mealPlanner: {
					id: '580831e5-bf75-44b2-beb0-c75be6652a33',
					monday: {
						id: '7dc734d5-9370-4671-9a8a-c88a2f312d5b',
					},
					tuesday: {
						id: 'c9b260ef-3018-4bf2-af1e-037891d5470e',
					},
					wednesday: {
						id: 'ac15c89f-b992-4b45-8f45-915c42a50708',
					},
					thursday: {
						id: '12f2c550-491a-4eab-ab6a-2b65b1abaf59',
					},
					friday: {
						id: '67765658-de0a-42d9-9377-dd244995d92a',
					},
					saturday: {
						id: '5031b5b9-3ac3-4fb9-8d70-7dc8491348fd',
					},
					sunday: {
						id: 'f7b61156-88e0-43fd-be2f-137e491547fc',
					},
				},
			},
			{
				id: '2d94f815-2bf0-47fe-a0e9-e0bec3d3c9bd',
				firstName: 'Ricardo',
				lastName: 'Munoz',
				username: 'RicardoMunoz',
				password: bcrypt.hashSync('password', 10),
				mealPlanner: {
					id: '30c43104-fef3-40f2-8737-e5c0e170a411',
					monday: {
						id: '5041f6c5-bc12-4cda-87d0-a7bfbc5ef192',
					},
					tuesday: {
						id: '9dc859b6-deb0-4297-804a-51888bc4715e',
					},
					wednesday: {
						id: '2a7aea87-228c-4bc4-becc-94b7097768a8',
					},
					thursday: {
						id: '191f01ad-b13d-4fc7-88cd-410dc8f673c3',
					},
					friday: {
						id: 'adb8b270-c0d5-41b0-8ecc-0cf836dd16b0',
					},
					saturday: {
						id: '0e4c47fd-e4fa-4724-a327-6e76e0e59a8e',
					},
					sunday: {
						id: '7fcf8a63-142b-4ec0-8b7e-0cefd69a6fe9',
					},
				},
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connection.createEntityManager().remove(UserSchema);
	}
}
