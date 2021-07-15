import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Product } from 'modules/database/models/product';

import { OrderRepository } from '../repositories/order';
import { ProductRepository } from '../repositories/product';
import { NewOrderValidator } from '../validators/order/newOrder';
import { OrderService } from './order';

describe('App/OrderService', () => {

  let orderRepository: OrderRepository;
  let orderService: OrderService;
  let productRepository: ProductRepository;
  let products: Array<any>

  beforeEach(async () => {
    orderRepository = new OrderRepository();
    productRepository = new ProductRepository();
    orderService = new OrderService(orderRepository, productRepository);
    products = [
      {
        "id": 1,
        "name": "Gorgeous Rubber Pizza",
        "salesPrice": 3,
        "stockQuantity": 623
      },
      {
        "id": 2,
        "name": "Intelligent Metal Chicken",
        "salesPrice": 6,
        "stockQuantity": 743
      },
      {
        "id": 3,
        "name": "Tasty Granite Ball",
        "salesPrice": 33,
        "stockQuantity": 957,
      },
    ]
  });

  it('should return null indicating that a order was successfully made', async () => {
    const findProducts = jest.spyOn(productRepository, 'findByIds').mockImplementation(() => Promise.all(products) as Promise<Product[]>);
    const insertOrder = jest.spyOn(orderRepository, 'insert').mockImplementation(() => null);

    const items = products.map(product => ({ 
      product: product,
      quantity: 1,
      price: product.salesPrice
    }))
    
    const result = await orderService.newOrder(
      {
        "items": items,
        "user": null
      } as NewOrderValidator,
      {
        id: 1,
        email: 'admin@waproject.com.br',
        firstName: 'WaProject',
        lastName: 'Admin',
        roles: [ 'sysAdmin' ],
        type: 0,
        exp: 1626332029,
        iat: 1626303229
      } as ICurrentUser
    );

    expect(findProducts).toBeCalled();
    expect(insertOrder).toBeCalled();
    
    expect(result).toEqual(null);
  });

});
