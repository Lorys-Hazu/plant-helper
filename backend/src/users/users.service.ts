import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, TaskType } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

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
    createPlantDto: Prisma.PlantCreateInput & { currentStatus: { id: number } },
  ) {
    try {
      const newPlant = await this.db.plant.create({
        data: {
          ...createPlantDto,
          owner: { connect: { id } },
          currentStatus: { connect: { id: createPlantDto.currentStatus.id } },
        },
      });
      return newPlant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
}
