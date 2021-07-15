import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsObject, IsOptional, Min } from 'class-validator';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

import { ProductValidator } from './product';

export class OrderItemValidator implements IOrderItem{
  
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ required: true, type: ProductValidator })
  product: ProductValidator;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  quantity: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @ApiProperty({ required: false, type: 'number' })
  price: number;

}