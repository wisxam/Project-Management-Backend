import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/infra/services/prisma.service';
import { TasksRepository } from 'src/infra/repositories/tasks.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService],
})
export class TasksModule {}
