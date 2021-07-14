import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IProduct } from '../interfaces/product';
import { OrderItem } from './orderItem';

export class Product extends Model implements IProduct {

  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'integer' })
  public salesPrice: number;
  @ApiProperty({ type: 'integer' })
  public stockQuantity?: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public orderItems: OrderItem[];

  public static get tableName(): string {
    return 'Product';
  }

  public static get relationMappings(): any {
    return {
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'Product.id',
          to: 'OrderItem.productId'
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