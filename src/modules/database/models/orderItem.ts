import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrderItem } from '../interfaces/orderItem';
import { Order } from './order';
import { Product } from './product';

export class OrderItem extends Model implements IOrderItem {
  
  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'float' })
  public price: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;
  @ApiProperty()
  public product: Product;
  @ApiProperty()
  public order: Order;


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
          to: 'OrderItem.order.id'
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