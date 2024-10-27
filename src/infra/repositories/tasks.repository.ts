import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findTasksForProject(projectId: number) {
    return this.prismaService.task.findMany({
      where: {
        projectId,
      },
    });
  }

  async findById(id: number) {
    return this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async create(projectId: number, taskDto: TaskDto, userId: number) {
    return this.prismaService.task.create({
      data: {
        ...taskDto,
        projectId,
        authorUserId: userId,
      },
    });
  }

  async update(taskId: number, updateTaskDto: TaskDto) {
    return this.prismaService.task.update({
      where: { id: taskId },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.task.delete({
      where: { id: Number(id) },
    });
  }

  async deleteMany(id: string | string[]) {
    const ids = Array.isArray(id)
      ? id.map((id: string) => Number(id))
      : [Number(id)];
    return this.prismaService.task.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async findByIds(ids: number[]) {
    return this.prismaService.task.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findManyById(taskIds: string[]): Promise<Task[]> {
    const numericTasks = taskIds.map((task) => Number(task));
    return this.prismaService.task.findMany({
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
    return this.prismaService.task.update({
      where: { id },
      data: { ...status },
    });
  }

  async updateTaskAssignedId(projectId: number, userId: number) {
    return this.prismaService.task.updateMany({
      where: {
        projectId: projectId,
        assignedUserId: userId,
      },
      data: {
        assignedUserId: null, // or use 0, null, or another placeholder
      },
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
}
