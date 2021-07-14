import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'modules/database/models/product';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { ListValidator } from '../validators/product/list';

@ApiTags('Order')
@Controller('/order')
export class ProductController {
  constructor(
    private readonly orderService: OrderService, 
    private readonly orderRepository: OrderRepository
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: ListValidator) {
    return {};
  }

}