import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
