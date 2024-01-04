import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, TaskType } from '@prisma/client';
import { StatusTransformationPipe } from 'src/pipes/StatusTransformationPipe';

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

  @Post(':id/plants')
  addPlant(
    @Param('id') id: string,
    @Body(StatusTransformationPipe)
    createPlantDto: Prisma.PlantCreateInput & {
      currentStatus: { id: number };
    },
  ) {
    return this.usersService.addPlant(+id, createPlantDto);
  }
}
