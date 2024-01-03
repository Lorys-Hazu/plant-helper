import { Controller, Param, Patch, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() data: Prisma.TaskCreateInput) {
    return this.tasksService.create(data);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(+id);
  }
}
