import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Product } from 'modules/database/models/product';

import { OrderRepository } from '../repositories/order';
import { ProductRepository } from '../repositories/product';
import { NewOrderValidator } from '../validators/order/newOrder';

@Injectable()
export class OrderService {
  
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository
  ) {}

  public async newOrder(model: NewOrderValidator, currentUser: ICurrentUser){

    // validating stock
    const productsIds: number[] = model.items.map(item => item.product)
    .map(product => product.id);
    const products: Product[] = await this.productRepository.findByIds(productsIds);

    const stockRequired: number[] = model.items.map(item => item.quantity);
    const productsWithoutEnoughStock = products.filter((product, index) => product.stockQuantity >= stockRequired[index]);

    if(productsWithoutEnoughStock.length > 0){
      const productsNames = productsWithoutEnoughStock.map(product => product.name)
        .reduce((prev, curr) => prev += ", "+curr)
      const errorMessage: string = "Some products dont have enough stock: " 
        + productsNames;
      throw new Error(errorMessage);
    }

    // validating price items
    model.items = model.items.map(item => {
      if(!item.price){
        item.price = item.product.salesPrice;
      }
      return item;
    });

    if(!model.user){
      model.user.id = currentUser.id;
    }

    return this.orderRepository.insert(model);
  }
}
