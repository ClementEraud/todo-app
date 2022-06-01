import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IMealOfTheDayWriteRepository } from '../../../../application/ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { MealOfTheDay } from '../../../../domain/models/MealOfTheDay';
import { MealOfTheDaySchema } from '../../mapper/MealOfTheDaySchema';

export class MealOfTheDayWriteRepository
	implements IMealOfTheDayWriteRepository
{
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async update(mealOfTheDay: MealOfTheDay): Promise<MealOfTheDay> {
		await this.manager.update(
			MealOfTheDaySchema,
			{ id: mealOfTheDay.id },
			mealOfTheDay,
		);
		return mealOfTheDay;
	}
}
