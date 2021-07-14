import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProductController } from './controllers/product';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { ProductRepository } from './repositories/product';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { ProductService } from './services/product';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [
    AuthController, 
    ProfileController, 
    ProductController
  ],
  providers: [
    AuthService, 
    UserService, 
    UserRepository, 
    DeviceRepository,
    ProductService, 
    ProductRepository,
  ]
})
export class AppModule {}
