import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(+id);
  }
}
