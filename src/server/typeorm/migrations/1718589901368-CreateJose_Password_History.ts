import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJosePasswordHistory1718589901368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'jose_password_history',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'current_password',
                    type: 'varchar'
                },
                {
                    name: 'previous_password_1',
                    type: 'varchar'
                },
                {
                    name: 'previous_password_2',
                    type: 'varchar'
                },
                {
                    name: 'previous_password_3',
                    type: 'varchar'
                },
                {
                    name: 'previous_password_4',
                    type: 'varchar'
                },
                {
                    name: 'previous_password_5',
                    type: 'varchar'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('jose_password_history');
    }

}
