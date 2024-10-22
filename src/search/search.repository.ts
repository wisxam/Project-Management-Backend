import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/services/prisma.service';
import { SearchDto } from 'src/dto/search.dto';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchTasks(query: SearchDto) {
    return this.prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query.query ?? '',
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query.query ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
  async searchProjects(query: SearchDto) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query.query ?? '' ?? '',
              mode: 'insensitive',
            },
            description: {
              contains: query.query ?? '' ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
  async searchUsers(query: SearchDto) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query.query ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
