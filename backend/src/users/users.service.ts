import { Injectable } from '@nestjs/common';
import { Prisma, TaskType } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  getTasks(id: number, params: { type?: TaskType; completed?: boolean }) {
    const { type, completed } = params;
    const where: Prisma.TaskWhereInput = {
      ownerId: id,
      type,
      completed,
    };
    return this.db.task.findMany({ where });
  }
}
