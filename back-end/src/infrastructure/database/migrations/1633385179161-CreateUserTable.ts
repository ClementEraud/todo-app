import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateUserTable1633385179161 implements MigrationInterface {
	name = 'CreateUserTable1633385179161';

	userTable = new Table({
		name: 'user',
		columns: [
			{
				name: 'id',
				type: 'int',
				isPrimary: true,
				isGenerated: true,
			},
			{
				name: 'firstName',
				type: 'varchar',
				isNullable: false,
			},
			{
				name: 'lastName',
				type: 'varchar',
				isNullable: false,
			},
		],
	});

	taskTable = new Table({
		name: 'task',
		columns: [
			{
				name: 'id',
				type: 'int',
				isPrimary: true,
				isGenerated: true,
			},
			{
				name: 'title',
				type: 'varchar',
				isNullable: false,
			},
			{
				name: 'description',
				type: 'varchar',
				isNullable: false,
			},
			{
				name: 'userId',
				type: 'int',
			},
		],
	});

	fkTaskUser = new TableForeignKey({
		name: 'fk_task_user',
		columnNames: ['userId'],
		referencedColumnNames: ['id'],
		referencedTableName: 'user',
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(this.userTable, true);
		await queryRunner.createTable(this.taskTable, true);
		await queryRunner.createForeignKey(this.taskTable, this.fkTaskUser);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(this.taskTable, this.fkTaskUser);
		await queryRunner.dropTable(this.taskTable);
		await queryRunner.dropTable(this.userTable);
	}
}
