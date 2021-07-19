import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IProduct } from 'modules/database/interfaces/product';

export class ProductValidator implements IProduct {
  
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', maxLength: 50 })
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  @Min(0)
  @ApiProperty({ required: true, type: 'number' })
  salesPrice: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, type: 'integer' })
  stockQuantity: number;
}