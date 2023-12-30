import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PlantsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createPlantDto: Prisma.PlantCreateInput) {
    return this.db.plant.create({ data: createPlantDto });
  }

  async findAll() {
    return this.db.plant.findMany();
  }

  async findOne(id: number) {
    return this.db.plant.findUnique({ where: { id } });
  }

  async update(id: number, updatePlantDto: Prisma.PlantUpdateInput) {
    return this.db.plant.update({ where: { id }, data: updatePlantDto });
  }

  async remove(id: number) {
    return this.db.plant.delete({ where: { id } });
  }
}
