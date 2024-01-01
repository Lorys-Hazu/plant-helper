import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskType } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/tasks')
  getTasks(
    @Param('id') id: string,
    @Query('type') type: TaskType,
    @Query('completed') completed: boolean,
  ) {
    return this.usersService.getTasks(+id, { type, completed });
  }
}
