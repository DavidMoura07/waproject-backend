import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { IOrderItem } from '../interfaces/orderItem';
import { IProduct } from '../interfaces/product';
import { Order } from './order';
import { Product } from './product';

export class OrderItem extends Model implements IOrderItem {
  
  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'integer' })
  public productId: number;
  @ApiProperty({ type: 'integer' })
  public orderId: number;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'number' })
  public price: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;
  
  public product: IProduct;
  public order: IOrder;

  @ApiProperty({ type: 'number' })
  public get totalValue(): number {
    return this.quantity * this.price;
  }

  public static get virtualAttributes(): string[] {
    return ['totalValue'];
  }

  public static get tableName(): string {
    return 'OrderItem';
  }

  public static get relationMappings(): any {
    return {
      product: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: 'Product.id',
          to: 'OrderItem.productId'
        }
      },
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        join: {
          from: 'Order.id',
          to: 'OrderItem.orderId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

}