import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infra/services/prisma.service';
import { ProjectController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from 'src/infra/repositories/projects.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectsService, ProjectsRepository, PrismaService],
  exports: [ProjectsService],
})
export class ProjectModule {}
