import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async complete(id: number) {
    await this.completeTask(id);
    await this.setupFollowingTask(id);
  }

  async completeTask(id: number) {
    return this.db.task.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });
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
      case 'water':
        nextDueAt.setDate(nextDueAt.getDate() + 7);
        break;
      case 'fertilize':
        nextDueAt.setMonth(nextDueAt.getMonth() + 1);
        break;
      case 'repot':
        nextDueAt.setMonth(nextDueAt.getMonth() + 12);
        break;
      default:
        return null;
    }
    return nextDueAt;
  }
}
