import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProject(userId: number, projectDto: ProjectDto) {
    return this.prismaService.project.create({
      data: {
        ...projectDto,
        userId,
      },
    });
  }

  async getProjects(userId: number) {
    return this.prismaService.project.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteProjects(userId: number) {
    return this.prismaService.project.deleteMany({
      where: {
        userId,
      },
    });
  }

  async getProjectByProjectId(id: number) {
    return this.prismaService.project.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProjectById(id: number, projectDto: ProjectDto, userId: number) {
    return this.prismaService.project.update({
      where: { id },
      data: {
        ...projectDto,
        userId,
      },
    });
  }

  async deleteProjectById(id: number, userId: number) {
    return this.prismaService.project.delete({
      where: {
        id,
        userId,
      },
    });
  }
}

interface ProjectDto {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}
