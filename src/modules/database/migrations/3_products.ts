import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table
      .string('name', 50)
      .notNullable()
      .unique();
    table.float('salesPrice').defaultTo(0.0);
    table.integer('stockQuantity').defaultTo(0);
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Product');
}
