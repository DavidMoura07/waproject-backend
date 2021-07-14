import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AdminModule } from './admin/module';
import { AppModule } from './app/module';

@Module({
  imports: [
    RouterModule.forRoutes([
      {
        path: '/api', 
        module: this,
        children: [
          { 
            path: '/admin', 
            module: AdminModule 
          },
          { 
            path: '/app', 
            module: AppModule 
          },
        ]
      }
      
      
    ]),
    AdminModule,
    AppModule
  ]
})
export class ApplicationModule {}
