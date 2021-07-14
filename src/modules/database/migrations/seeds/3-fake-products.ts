import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IProduct } from 'modules/database/interfaces/product';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const products = await knex
    .count()
    .from('Product')
    .first();

  if (Number(products.count) > 0) return;

  for (let x = 0; x < 100; x++) {
    const name = faker.commerce.productName();
    const salesPrice = Number.parseFloat(faker.commerce.price());
    const stockQuantity = faker.random.number(1000);

    const product: IProduct = {
      name,
      salesPrice,
      stockQuantity,
      createdDate: new Date(),
      updatedDate: new Date()
    };
    console.log(product);
    await knex.insert(product).into('Product');
  }
}
