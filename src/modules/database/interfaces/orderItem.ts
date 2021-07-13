import { IProduct } from './product';

export interface IOrderItem {
  id?: number;
  quantity: number;
  price: number;
  product: IProduct;

  createdDate?: Date;
  updatedDate?: Date
}