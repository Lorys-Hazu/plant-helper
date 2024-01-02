import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
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
    console.log('type', type);
    return this.usersService.getTasks(+id, { type, completed });
  }
}
