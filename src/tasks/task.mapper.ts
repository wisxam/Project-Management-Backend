import { Task } from '@prisma/client';

export class TaskMapper {
  static updateResponseMapper(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      tags: task.tags,
      startDate: task.startDate,
      dueDate: task.dueDate,
      points: task.points,
      projectId: task.projectId,
    };
  }

  static updateStatusMapper(status: Task['status']) {
    return {
      status,
    };
  }
}
