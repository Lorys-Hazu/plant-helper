import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, TaskType } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { TasksService } from 'src/tasks/tasks.service';
import { PlantsService } from 'src/plants/plants.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly tasksService: TasksService,
    private readonly plantsService: PlantsService,
  ) {}

  async findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  async getTasks(id: number, params: { type?: TaskType; completed?: boolean }) {
    return await this.tasksService.getTasksForUser(id, params);
  }

  async getPlants(id: number) {
    return await this.plantsService.getPlantsForUser(id);
  }

  async addPlant(
    id: number,
    createPlantDto: Prisma.PlantCreateInput & {
      previousStatusId?: number;
      newStatusId?: number;
    },
  ) {
    try {
      const newPlant = await this.plantsService.create(createPlantDto, {
        ownerId: id,
        newStatusId: createPlantDto.newStatusId,
      });

      await this.tasksService.intializePlantTasks(newPlant.id, id);
      return newPlant;
    } catch (error) {
      console.error('[ERROR] users service addPlant ---', error);
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
}
