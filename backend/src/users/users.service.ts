import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, TaskType } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly tasksService: TasksService,
  ) {}

  async findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  async getTasks(id: number, params: { type?: TaskType; completed?: boolean }) {
    const { type, completed } = params;
    const where: Prisma.TaskWhereInput = {
      ownerId: id,
      type,
      completed,
    };
    return this.db.task.findMany({ where });
  }

  async getPlants(id: number) {
    return this.db.plant.findMany({
      where: { ownerId: id },
      include: { tasks: true, currentStatus: true, statusHistory: true },
    });
  }

  async addPlant(
    id: number,
    createPlantDto: Prisma.PlantCreateInput & {
      previousStatusId?: number;
      newStatusId?: number;
    },
  ) {
    try {
      const newPlant = await this.db.plant.create({
        data: {
          name: createPlantDto.name,
          species: createPlantDto.species,
          owner: { connect: { id } },
          currentStatus: { connect: { id: createPlantDto.newStatusId } },
          statusHistory: {
            create: {
              previousStatusId: null,
              newStatusId: createPlantDto.newStatusId,
              changedAt: new Date(),
            },
          },
        },
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
