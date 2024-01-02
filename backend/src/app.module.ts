import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PlantsModule } from './plants/plants.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, PlantsModule, AuthModule, TasksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
