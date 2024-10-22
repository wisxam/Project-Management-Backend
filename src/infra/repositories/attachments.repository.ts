// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../services/prisma.service';

// @Injectable()
// export class ProjectsRepository {
//   constructor(private readonly prismaService: PrismaService) {}

//   async createProject(userId: number, projectDto: createProjectRequest) {
//     return this.prismaService.project.create({
//       data: {
//         ...projectDto,
//         userId,
//       },
//     });
//   }

//   async getProjects(userId: number) {
//     return this.prismaService.project.findMany({
//       where: {
//         userId,
//       },
//     });
//   }
// }

// interface createProjectRequest {
//   name: string;
//   description?: string;
//   startDate: Date;
//   endDate: Date;
// }
