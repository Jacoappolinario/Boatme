import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsBoats1645210767636
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_boats',
        columns: [
          {
            name: 'boat_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_boats',
      new TableForeignKey({
        name: 'FKSpecificationBoat',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_boats',
      new TableForeignKey({
        name: 'FKBoatSpecification',
        referencedTableName: 'boats',
        referencedColumnNames: ['id'],
        columnNames: ['boat_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_boats',
      'FKSpecificationBoat',
    );

    await queryRunner.dropForeignKey(
      'specifications_boats',
      'FKBoatSpecification',
    );

    await queryRunner.dropTable('specifications_boats');
  }
}
