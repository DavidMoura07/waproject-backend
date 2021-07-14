import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'modules/database/models/product';

import { ProductRepository } from '../repositories/product';
import { ProductService } from '../services/product';
import { ListValidator } from '../validators/product/list';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService, 
    private readonly productRepository: ProductRepository
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: ListValidator) {
    return this.productRepository.list(model);
  }

}