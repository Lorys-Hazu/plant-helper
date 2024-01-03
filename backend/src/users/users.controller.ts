import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { TaskType } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/tasks')
  getTasks(
    @Param('id') id: string,
    @Query('type') type: TaskType,
    @Query('completed') completed: boolean,
  ) {
    return this.usersService.getTasks(+id, { type, completed });
  }

  @Get(':id/plants')
  getPlants(@Param('id') id: string) {
    return this.usersService.getPlants(+id);
  }
}
