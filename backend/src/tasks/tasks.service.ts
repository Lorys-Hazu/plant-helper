import { Injectable } from '@nestjs/common';
import { Prisma, Task, TaskType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.db.task.create({ data });
  }

  async intializePlantTasks(plantId: number, ownerId: number) {
    const tasks: Pick<Task, 'type' | 'dueDate' | 'description'>[] = [
      { type: 'WATER', dueDate: new Date(), description: 'Water your plant' },
      {
        type: 'FERTILIZE',
        dueDate: new Date(),
        description: 'Fertilize your plant',
      },
      { type: 'REPOT', dueDate: new Date(), description: 'Repot your plant' },
    ];

    return Promise.all(
      tasks.map((task) =>
        this.db.task.create({
          data: {
            ...task,
            plant: { connect: { id: plantId } },
            owner: { connect: { id: ownerId } },
          },
        }),
      ),
    );
  }

  async getTasksForUser(
    id: number,
    params: { type?: TaskType; completed?: boolean },
  ) {
    const where: Prisma.TaskWhereInput = { ownerId: id };
    if (params.type) where.type = params.type;
    if (params.completed != undefined) where.completed = params.completed;

    return this.db.task.findMany({
      where,
      include: {
        plant: { include: { statusHistory: true, currentStatus: true } },
      },
    });
  }

  async complete(id: number) {
    await this.completeTask(id);
    await this.setupFollowingTask(id);
    return this.db.task.findUnique({ where: { id } });
  }

  async completeTask(id: number) {
    const updatedTask = await this.db.task.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });
    return updatedTask;
  }

  async setupFollowingTask(id: number) {
    const task = await this.db.task.findUnique({ where: { id } });
    if (!task) return;
    const { type, dueDate, plantId, ownerId, description } = task;
    const nextDueAt = this.getNextDueAt(type, dueDate);
    if (!nextDueAt) return;
    return this.db.task.create({
      data: { type, dueDate: nextDueAt, plantId, ownerId, description },
    });
  }

  getNextDueAt(type: string, dueDate: Date) {
    const nextDueAt = new Date(dueDate);
    switch (type) {
      case 'WATER':
        nextDueAt.setDate(nextDueAt.getDate() + 7);
        break;
      case 'FERTILIZE':
        nextDueAt.setMonth(nextDueAt.getMonth() + 1);
        break;
      case 'REPOT':
        nextDueAt.setMonth(nextDueAt.getMonth() + 12);
        break;
      default:
        return null;
    }
    return nextDueAt;
  }
}
