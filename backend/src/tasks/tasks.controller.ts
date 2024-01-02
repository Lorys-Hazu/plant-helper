import {
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() data: Prisma.TaskCreateInput) {
    return this.tasksService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(+id);
  }
}
