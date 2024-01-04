import { Injectable } from '@nestjs/common';
import { Plant, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PlantsService {
  constructor(private readonly db: DatabaseService) {}

  async create(
    createPlantDto: Prisma.PlantCreateInput,
    additionalInfos?: { ownerId: number; newStatusId: number },
  ) {
    const requestData = {
      name: createPlantDto.name,
      species: createPlantDto.species,
      owner: { connect: { id: additionalInfos.ownerId } },
      currentStatus: undefined,
      statusHistory: undefined,
    };

    if (additionalInfos.newStatusId) {
      requestData.currentStatus = {
        connect: { id: additionalInfos.newStatusId },
      };

      requestData.statusHistory = {
        create: {
          previousStatusId: null,
          newStatusId: additionalInfos.newStatusId,
          changedAt: new Date(),
        },
      };
    }

    const createdPlant = await this.db.plant.create({
      data: requestData,
    });

    return createdPlant;
  }

  async findAll() {
    return this.db.plant.findMany();
  }

  async getPlantsForUser(id: number) {
    const plants: Plant[] = await this.db.plant.findMany({
      where: { ownerId: id },
      include: { tasks: true, currentStatus: true, statusHistory: true },
    });

    return plants;
  }

  async findOne(id: number) {
    return this.db.plant.findUnique({
      where: { id },
      include: {
        tasks: true,
        currentStatus: true,
        statusHistory: {
          include: {
            previousStatus: true,
            newStatus: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updatePlantDto: Prisma.PlantUpdateInput & {
      previousStatusId?: number;
      newStatusId?: number;
    },
  ) {
    const updateData = {
      name: updatePlantDto.name,
      species: updatePlantDto.species,
      currentStatus: undefined,
      statusHistory: undefined,
    };

    if (updatePlantDto.newStatusId) {
      updateData.currentStatus = {
        connect: { id: updatePlantDto.newStatusId },
      };

      if (updatePlantDto.previousStatusId) {
        updateData.statusHistory = {
          create: {
            previousStatusId: updatePlantDto.previousStatusId,
            newStatusId: updatePlantDto.newStatusId,
            changedAt: new Date(),
          },
        };
      }
    }
    return this.db.plant.update({ where: { id }, data: updateData });
  }

  async remove(id: number) {
    return this.db.plant.delete({ where: { id } });
  }
}
