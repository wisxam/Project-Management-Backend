import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/guards';
import { CreateTaskDto, UpdateTaskStatus } from './tasks.dto.ts/createTaskDto';
import { TaskMapper } from './task.mapper';

@Controller('projects/:pid')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasksByProjectId(
    @Param('pid', ParseIntPipe) pid: number,
    @Req() req: any,
  ) {
    const user = req.user.userId;

    return this.tasksService.getTasksByProjectId(pid, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('task')
  createTask(
    @Body() taskDto: CreateTaskDto,
    @Param('pid', ParseIntPipe) projectId: number,
    @Req() req: any,
  ) {
    const user = req.user.userId;

    return this.tasksService.createTask(projectId, taskDto, user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateTask(
    @Param('pid', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: CreateTaskDto,
    @Req() req: any,
  ) {
    const user = req.user.userId;
    return this.tasksService.updateTask(projectId, taskId, updateTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteTasks(
    @Query('ids') ids: string | string[],
    @Param('pid', ParseIntPipe) pid: number,
    @Req() req: any,
  ) {
    const user = req.user.userId;

    await this.tasksService.deleteTaskByIds(pid, ids, user);
    return { message: 'Tasks deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/status/:id')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) taskId: number,
    @Param('pid', ParseIntPipe) projectId: number,
    @Body() updateTaskDto: UpdateTaskStatus,
    @Req() req: any,
  ) {
    const user = req.user.userId;
    const statusUpdate = await this.tasksService.updateTaskStatus(
      taskId,
      updateTaskDto,
      user,
      projectId,
    );
    return TaskMapper.updateStatusMapper(statusUpdate.status);
  }
}
