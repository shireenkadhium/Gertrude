import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_SALT_ROUNDS } from '../src/auth/auth.constants';

const { SYSTEM_USER, SYSTEM_USER_PASSWORD } = process.env;

export class SeedSystemUser1685746893648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = bcrypt.hashSync(
      SYSTEM_USER_PASSWORD,
      PASSWORD_SALT_ROUNDS,
    );
    await queryRunner.query(`
      INSERT INTO "users" ("firstName", "lastName", "email", "password", "roles", "isSystemUser")
      VALUES ('System', 'User', '${SYSTEM_USER}', '${password}', '{user,admin}', true)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
