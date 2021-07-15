import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';
import { OrderItem } from 'modules/database/models/orderItem';
import { User } from 'modules/database/models/user';

import { OrderItemValidator } from './orderItem';
import { UserValidator } from './user';

export class NewOrderValidator implements IOrder {
  
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ 
    type: OrderItemValidator,
    isArray: true,
    required: true, 
  })
  items: OrderItem[];
  
  @IsOptional()
  @IsObject()
  @ApiProperty({ required: false, type: UserValidator })
  user: User;
}