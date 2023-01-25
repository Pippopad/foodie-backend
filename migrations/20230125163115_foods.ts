import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('foods', (table) => {
    table.increments('id');
    table.string('name', 64).notNullable();
    table.double('price', 2).notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('foods');
}
