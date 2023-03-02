import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessagesTable1676543646189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: `uuid_generate_v4()`,
          },
          { name: 'sender_id', type: 'uuid' },
          { name: 'conversation_id', type: 'uuid' },
          { name: 'message', type: 'text' },
          { name: 'type', type: 'smallint', unsigned: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
