import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

export class OrderItemValidator implements IOrderItem{
  
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

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  productId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  orderId: number;

}