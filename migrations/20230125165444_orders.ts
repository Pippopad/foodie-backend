import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('orders', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.timestamps(false, true);
    })
    .createTable('orders_foods', (table) => {
      table.increments('id');
      table.integer('order_id').unsigned().notNullable();
      table.foreign('order_id').references('id').inTable('orders');
      table.integer('food_id').unsigned().notNullable();
      table.foreign('food_id').references('id').inTable('foods');
      table.integer('amount').unsigned().defaultTo(1);
      table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}
