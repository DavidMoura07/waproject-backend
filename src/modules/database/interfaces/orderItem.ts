import { IOrder } from './order';
import { IProduct } from './product';

export interface IOrderItem {
  id?: number;
  quantity: number;
  price: number;
  productId: number;
  orderId: number;
  product?: IProduct;
  order?: IOrder;
  totalValue?: number;

  createdDate?: Date;
  updatedDate?: Date
}