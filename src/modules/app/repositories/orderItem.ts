import { Injectable } from '@nestjs/common';
import { IOrderItem } from 'modules/database/interfaces/orderItem';
import { OrderItem } from 'modules/database/models/orderItem';
import { Transaction } from 'objection';

@Injectable()
export class OrderItemRepository {

  public async findById(id: number, transaction?: Transaction): Promise<OrderItem> {
    return OrderItem.query(transaction).findById(id);
  }

  public async insert(model: IOrderItem, transaction?: Transaction): Promise<OrderItem> {
    return OrderItem.query(transaction).insert(model);
  }

  public async update(model: IOrderItem, transaction?: Transaction): Promise<OrderItem> {
    return OrderItem.query(transaction).updateAndFetchById(model.id, model as any);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await OrderItem.query(transaction)
      .del()
      .where({ id });
  }

}