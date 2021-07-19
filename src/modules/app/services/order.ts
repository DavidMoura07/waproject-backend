import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrderItem } from 'modules/database/interfaces/orderItem';
import { Product } from 'modules/database/models/product';

import { OrderRepository } from '../repositories/order';
import { OrderItemRepository } from '../repositories/orderItem';
import { ProductRepository } from '../repositories/product';
import { NewOrderValidator } from '../validators/order/newOrder';

@Injectable()
export class OrderService {
  
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderItemRepository: OrderItemRepository
  ) {}
  
  public async newOrder(model: NewOrderValidator, currentUser: ICurrentUser){
    
    // Getting products
    const productsIds: number[] = model.items.map(item => item.productId);
    const products: Product[] = await this.productRepository.findByIds(productsIds);

    // validating products required
    if(products.length != productsIds.length){
      const idsNotFound = this.getIdsNotFound(productsIds, products);
      const productsNotFound = model.items
        .filter(item => idsNotFound.includes(item.productId))
        .map(item => item.product && item.product.name || item.productId);
      throw new Error(`Some products was not found: ${productsNotFound}`);
    }
    
    // validating stock
    const productsWithoutEnoughStock = this.checkStock(model.items, products);
    if(productsWithoutEnoughStock.length > 0){
      const productsNames = productsWithoutEnoughStock
        .map(product => product.name)
        .reduce((prev, curr) => prev += ", "+curr)
      const errorMessage: string = "Some products don't have enough stock: "   
        + productsNames;
      throw new Error(errorMessage);  
    }  
    
    // update stock
    const productsWithNewStock = this.updateProductsStock(model.items, products);
    productsWithNewStock.forEach(product => this.productRepository.update(product));

    // Validating User
    if(!model.userId) model.userId = currentUser.id;
    
    // validating price items
    model.items = this.checkItemsPrices(model.items, products);  

    // creating order
    const newOrder = await this.orderRepository.insert(model);

    // adding OrderItems to order
    model.items.map(async orderItem => {
      orderItem.orderId = newOrder.id
      await this.orderItemRepository.insert(orderItem);
    });

    return newOrder;
  }

  private getIdsNotFound(idsRequireds: number[], productsFound: Product[]): number[]{
      const idsFound = productsFound.map(product => product.id);
      const idsNotFound = idsRequireds.filter(id => !idsFound.includes(id));
      return idsNotFound;
  }

  private checkStock(items: IOrderItem[], products: Product[]): Product[]{
    const stockRequired: number[] = items.map(item => item.quantity);
    return products.filter((product, index) => product.stockQuantity < stockRequired[index]);
  }

  private updateProductsStock(items: IOrderItem[], products: Product[]): Product[]{
    return products.map((product, index) => {
      const newStock = product.stockQuantity - items[index].quantity;
      product.stockQuantity = newStock;
      return product;
    });
  }

  private checkItemsPrices(items: IOrderItem[], products: Product[]): IOrderItem[] {
    return items.map((item, index) => {
      if(!item.price){
        item.price = products[index].salesPrice;
      }  
      return item;
    }); 
  }
}
