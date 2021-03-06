import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddPhone1644873438787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phone');
  }
}
