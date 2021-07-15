import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';
import { Product } from 'modules/database/models/product';

import { OrderService } from '../services/order';
import { NewOrderValidator } from '../validators/order/newOrder';

@ApiTags('Order')
@Controller('/order')
@AuthRequired([enRoles.user, enRoles.admin, enRoles.sysAdmin])
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @Post()
  @ApiResponse({ status: 201, type: Order})
  public async newOrder(@Body() model: NewOrderValidator, @CurrentUser() currentUser: ICurrentUser): Promise<Order>{
    return this.orderService.newOrder(model, currentUser);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@CurrentUser() currentUser: ICurrentUser) {
    return {};
  }

}