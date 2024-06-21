import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserIdToPasswordHistory1718917672161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'jose_password_history',
            new TableColumn(
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true
            })
        );

        await queryRunner.createForeignKey(
            'jose_password_history',
            new TableForeignKey({
                name: 'UsersPasswordHistory',
                columnNames: ['user_id'],
                referencedTableName: 'jose_user',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jose_password_history', 'UsersPasswordHistory');
        await queryRunner.dropColumn('jose_password_history', 'user_id');
    }

}
