import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { enOrderStatus, IOrder } from '../interfaces/order';
import { IOrderItem } from '../interfaces/orderItem';
import { IUser } from '../interfaces/user';
import { OrderItem } from './orderItem';
import { User } from './user';

export class Order extends Model implements IOrder {

  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'integer' })
  public userId: number;
  @ApiProperty({ enum: enOrderStatus })
  public status: enOrderStatus;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;
  
  public items: IOrderItem[];
  public user: IUser;

  @ApiProperty({ type: 'number' })
  public get totalValue(): number {
    if(!this.items) return 0;
    return this.items
      .map(item => item.totalValue)
      .reduce((prev, curr) => prev += curr, 0);
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
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'Order.userId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
    this.status = enOrderStatus.waitingPayment;
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

}