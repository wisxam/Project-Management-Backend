import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTasksForProject(projectId: number) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async create(projectId: number, taskDto: TaskDto) {
    return this.prisma.task.create({
      data: {
        ...taskDto,
        projectId,
      },
    });
  }

  async update(taskId: number, updateTaskDto: TaskDto) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({
      where: { id: Number(id) },
    });
  }

  async deleteMany(id: string | string[]) {
    const ids = Array.isArray(id)
      ? id.map((id: string) => Number(id))
      : [Number(id)];
    return this.prisma.task.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async findByIds(ids: number[]) {
    return this.prisma.task.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findManyById(taskIds: string[]): Promise<Task[]> {
    const numericTasks = taskIds.map((task) => Number(task));
    return this.prisma.task.findMany({
      where: {
        id: {
          in: numericTasks,
        },
      },
    });
  }

  // async findTasksForProjects(projectId: number) {
  //   return this.prisma.task.findMany({
  //     where: {
  //       projectId,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });
  // }

  async updateTaskStatus(id: number, status: UpdateTaskStatusDto) {
    return this.prisma.task.update({
      where: { id },
      data: { ...status },
    });
  }
}

interface UpdateTaskStatusDto {
  status: string;
}

interface TaskDto {
  title: string;
  projectId: number;
  authorUserId: number;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate: Date;
  dueDate: Date;
  points?: number;
  assignedUserId?: number;
}
