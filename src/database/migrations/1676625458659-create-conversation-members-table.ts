import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createConversationMembersTable1676625458659
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversation_members',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: `uuid_generate_v4()`,
          },
          {
            name: 'conversation_id',
            type: 'uuid',
            foreignKeyConstraintName: 'id',
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'conversation_members_conversation_id_fkey',
            columnNames: ['conversation_id'],
            referencedTableName: 'conversations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversation_members');
  }
}
