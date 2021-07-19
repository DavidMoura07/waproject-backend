import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('OrderItem', table => {
    table.increments('id').primary();
    table.integer('quantity');
    table.float('price');

    table
      .integer('productId')
      .unsigned()
      .index()
      .references('id')
      .inTable('Product');

    table
      .integer('orderId')
      .unsigned()
      .index()
      .references('id')
      .inTable('Order');

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('OrderItem');
}
