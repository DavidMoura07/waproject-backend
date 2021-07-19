import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

import { OrderItemValidator } from './orderItem';

export class NewOrderValidator implements IOrder {
  
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ 
    type: OrderItemValidator,
    isArray: true,
    required: true, 
  })
  items: IOrderItem[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: 'number' })
  userId: number;
}