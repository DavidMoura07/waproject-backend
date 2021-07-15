import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { OrderController } from './controllers/order';
import { ProductController } from './controllers/product';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { OrderRepository } from './repositories/order';
import { ProductRepository } from './repositories/product';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { OrderService } from './services/order';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [
    AuthController, 
    ProfileController, 
    ProductController,
    OrderController,
  ],
  providers: [
    AuthService, 
    UserService, 
    UserRepository, 
    DeviceRepository,
    ProductRepository,
    OrderService,
    OrderRepository,
  ]
})
export class AppModule {}
