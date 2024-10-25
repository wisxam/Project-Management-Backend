import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksRepository } from 'src/infra/repositories/tasks.repository';
import { CreateTaskDto, UpdateTaskStatus } from './tasks.dto.ts/createTaskDto';
import { ProjectsRepository } from 'src/infra/repositories/projects.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  private async validateProjectAccess(projectId: number, userId: number) {
    const project =
      await this.projectsRepository.getProjectByProjectId(projectId);

    // Check if the project exists
    if (!project) {
      throw new NotFoundException('The given project is not valid');
    }

    // Check if the user is the owner
    if (project.userId === userId) {
      return project; // User is the owner, access granted
    }

    // Check if the user has been granted access to this project
    const isAllowed = await this.projectsRepository.getUserAccessProjectById(
      projectId,
      userId,
    );
    if (!isAllowed) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    return project; // User has access via the isAllowed check
  }

  async getTasksByProjectId(projectId: number, userId: number) {
    // Validate project access
    await this.validateProjectAccess(projectId, userId);

    // Proceed to fetch tasks for the project
    return this.tasksRepository.findTasksForProject(projectId);
  }

  async getTasksById(id: number) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(projectId: number, taskDto: CreateTaskDto, userId: number) {
    await this.validateProjectAccess(projectId, userId);
    return this.tasksRepository.create(projectId, taskDto);
  }

  async updateTask(
    projectId: number,
    taskId: number,
    updateTaskDto: CreateTaskDto,
    userId: number,
  ) {
    await this.validateProjectAccess(projectId, userId);

    const task = await this.getTasksById(taskId);

    if (task.projectId !== projectId) {
      throw new UnauthorizedException(
        'You are not authorized to update this task as it does not belong to the given project',
      );
    }

    return this.tasksRepository.update(task.id, updateTaskDto);
  }

  async deleteTaskByIds(
    projectId: number,
    ids: string | string[],
    userId: number,
  ) {
    await this.validateProjectAccess(projectId, userId);

    const taskIds = Array.isArray(ids) ? ids : ids.split(',');
    const tasksToDelete = await this.tasksRepository.findManyById(taskIds);
    const foundTaskIds = tasksToDelete.map((task) => task.id);
    const missingTaskIds = taskIds.filter(
      (id) => !foundTaskIds.includes(Number(id)),
    );

    if (missingTaskIds.length > 0) {
      throw new NotFoundException(
        `Tasks with the following IDs were not found or already deleted: ${missingTaskIds.join(', ')}`,
      );
    }

    const tasksForProjectId =
      await this.tasksRepository.findTasksForProject(projectId);
    const taskIdsForProjectId = tasksForProjectId.map((task) => task.id);

    if (taskIds.some((id) => !taskIdsForProjectId.includes(Number(id)))) {
      throw new UnauthorizedException(
        'You are not authorized to access or delete these tasks',
      );
    }

    if (taskIds.length === 1) {
      await this.tasksRepository.delete(taskIds[0]);
      return { deletedTask: tasksToDelete };
    } else {
      await this.tasksRepository.deleteMany(taskIds);
      return { deletedTasks: tasksToDelete };
    }
  }

  async updateTaskStatus(
    taskId: number,
    status: UpdateTaskStatus,
    userId: number,
    projectId: number,
  ) {
    await this.validateProjectAccess(projectId, userId);

    const task = await this.getTasksById(taskId);

    if (task.projectId !== projectId) {
      throw new UnauthorizedException(
        'You are not authorized to update this task as it does not belong to the given project',
      );
    }

    return this.tasksRepository.updateTaskStatus(taskId, status);
  }
}
