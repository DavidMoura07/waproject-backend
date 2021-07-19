import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';

import { OrderService } from '../services/order';
import { NewOrderValidator } from '../validators/order/newOrder';

@ApiTags('Order')
@Controller('/order')
@AuthRequired([enRoles.user])
export class OrderController {
  
  constructor(
    private readonly orderService: OrderService
  ) {}

  @Post()
  @ApiResponse({ status: 201, type: Order})
  public async newOrder(@Body() model: NewOrderValidator, @CurrentUser() currentUser: ICurrentUser): Promise<Order>{
    return this.orderService.newOrder(model, currentUser);
  }

}