import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IProduct } from 'modules/database/interfaces/product';

import { OrderRepository } from '../repositories/order';
import { OrderItemRepository } from '../repositories/orderItem';
import { ProductRepository } from '../repositories/product';
import { NewOrderValidator } from '../validators/order/newOrder';
import { OrderService } from './order';

describe('App/OrderService', () => {

  let orderRepository: OrderRepository;
  let orderService: OrderService;
  let productRepository: ProductRepository;
  let orderItemRepository: OrderItemRepository;
  let products: Array<IProduct>;

  beforeEach(async () => {
    orderRepository = new OrderRepository();
    productRepository = new ProductRepository();
    orderItemRepository = new OrderItemRepository();
    orderService = new OrderService(orderRepository, productRepository, orderItemRepository);
    products = [
      {
        "id": 1,
        "name": "Gorgeous Rubber Pizza",
        "salesPrice": 3.5,
        "stockQuantity": 10
      },
      {
        "id": 2,
        "name": "Intelligent Metal Chicken",
        "salesPrice": 6,
        "stockQuantity": 0
      },
      {
        "id": 3,
        "name": "Tasty Granite Ball",
        "salesPrice": 33,
        "stockQuantity": 957,
      },
    ]
  });

  it('Creating a sucessfull order, must return an IOrder Object', async () => {
    const findProducts = jest.spyOn(productRepository, 'findByIds').mockResolvedValue([products[0]] as any);
    const updateProducts = jest.spyOn(productRepository, 'update').mockResolvedValue(null);
    const insertOrderItem = jest.spyOn(orderItemRepository, 'insert').mockResolvedValue(null);
    const insertOrder = jest.spyOn(orderRepository, 'insert').mockResolvedValue({id: 1} as any);

    const model = {
      "items": [
          {
              "quantity": 1,
              "productId": 1
          },
      ]
    }

    const currentUser = {
      id: 1
    }
    
    const result = await orderService.newOrder(model as NewOrderValidator, currentUser as ICurrentUser)

    expect(findProducts).toBeCalled();
    expect(updateProducts).toBeCalled();
    expect(insertOrder).toBeCalled();
    expect(insertOrderItem).toBeCalled();
    
    expect(result).toEqual({id: 1});
  });

  it('Creating a order for a non stock product, must throw an Error', async () => {
    jest.spyOn(productRepository, 'findByIds').mockResolvedValue([products[1]] as any);
    jest.spyOn(productRepository, 'update').mockResolvedValue(null);
    jest.spyOn(orderItemRepository, 'insert').mockResolvedValue(null);
    jest.spyOn(orderRepository, 'insert').mockResolvedValue({id: 1} as any);

    const model = {
      "items": [
          {
              "quantity": 1,
              "productId": 2
          },
      ]
    }

    const currentUser = {
      id: 1
    }
    
    const f = async () => {
      await orderService.newOrder(model as NewOrderValidator, currentUser as ICurrentUser);
    }
    await expect(f()).rejects.toThrow("Some products don't have enough stock: Intelligent Metal Chicken");
  });

  it('Creating a order for a non existing product, must throw an Error', async () => {
    jest.spyOn(productRepository, 'findByIds').mockResolvedValue([] as any);
    jest.spyOn(productRepository, 'update').mockResolvedValue(null);
    jest.spyOn(orderItemRepository, 'insert').mockResolvedValue(null);
    jest.spyOn(orderRepository, 'insert').mockResolvedValue({id: 1} as any);

    const model = {
      "items": [
          {
              "quantity": 1,
              "productId": 200
          },
      ]
    }

    const currentUser = {
      id: 1
    }
    
    const f = async () => {
      await orderService.newOrder(model as NewOrderValidator, currentUser as ICurrentUser);
    }
    await expect(f()).rejects.toThrow("Some products was not found: 200");
  });

});
