import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.db.task.create({ data });
  }

  async intializePlantTasks(plantId: number, ownerId: number) {
    const tasks: Pick<Task, 'type' | 'dueDate'>[] = [
      { type: 'WATER', dueDate: new Date() },
      { type: 'FERTILIZE', dueDate: new Date() },
      { type: 'REPOT', dueDate: new Date() },
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
    const { type, dueDate, plantId, ownerId } = task;
    const nextDueAt = this.getNextDueAt(type, dueDate);
    if (!nextDueAt) return;
    return this.db.task.create({
      data: { type, dueDate: nextDueAt, plantId, ownerId },
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
