import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { enOrderStatus, IOrder } from '../interfaces/order';
import { OrderItem } from './orderItem';
import { User } from './user';

export class Order extends Model implements IOrder {

  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'string' })
  public status: enOrderStatus;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;
  
  @ApiProperty()
  public items: OrderItem[];
  @ApiProperty()
  public user: User;

  @ApiProperty({ type: 'float' })
  public get totalValue(): number {
    return this.items
      .map(item => item.totalValue)
      .reduce((prev, curr) => prev += curr);
  }

  public static get virtualAttributes(): string[] {
    return ['totalValue'];
  }

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'Order.id',
          to: 'OrderItem.orderId'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'User.id',
          to: 'Oder.userId'
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