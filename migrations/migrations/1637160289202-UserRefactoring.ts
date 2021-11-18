import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserRefactoring1637160289202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('User', 'users');
    await queryRunner.dropColumn('users', 'username');
    await queryRunner.addColumn('users', new TableColumn({ name: 'first_name', type: 'varchar' }));
    await queryRunner.addColumn('users', new TableColumn({ name: 'last_name', type: 'varchar' }));
    await queryRunner.addColumn('users', new TableColumn({ name: 'email', type: 'varchar', isUnique: true }));
    await queryRunner.addColumn('users', new TableColumn({ name: 'password', type: 'varchar' }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('users', 'User');
    await queryRunner.dropColumn('User', 'first_name');
    await queryRunner.dropColumn('User', 'last_name');
    await queryRunner.dropColumn('User', 'email');
    await queryRunner.dropColumn('User', 'password');
    await queryRunner.addColumn('User', new TableColumn({ name: 'username', type: 'varchar' }));
  }
}
