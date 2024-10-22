import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsRepository } from 'src/infra/repositories/projects.repository';
import { CreateProjectDto } from './dto/createProjectDto';
import { UpdateProjectDto } from './dto/updateProjectDto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getUserId(userId: number) {
    if (!userId) return new UnauthorizedException('User Id is not valid');
  }

  async createProject(userId: number, projectDto: CreateProjectDto) {
    this.getUserId(userId);
    return this.projectsRepository.createProject(userId, projectDto);
  }

  async getProjects(userId: number) {
    this.getUserId(userId);
    return this.projectsRepository.getProjects(userId);
  }

  // async deleteProjects(userId: number) {
  //   return this.projectsRepository.deleteProjects(userId);
  // }

  async updateProject(
    projectId: number,
    projectDto: UpdateProjectDto,
    userId: number,
  ) {
    const projectForUser = await this.validateProjectForUserId(
      projectId,
      userId,
    );

    if (projectForUser instanceof Error) {
      throw projectForUser;
    }

    return this.projectsRepository.updateProjectById(
      Number(projectId),
      projectDto,
      userId,
    );
  }

  async deleteProject(projectId: number, userId: number) {
    const projectForUser = await this.validateProjectForUserId(
      projectId,
      userId,
    );

    if (projectForUser instanceof Error) {
      throw projectForUser;
    }

    return this.projectsRepository.deleteProjectById(projectId, userId);
  }

  async validateProjectForUserId(projectId: number, userId: number) {
    const project =
      await this.projectsRepository.getProjectByProjectId(projectId);

    this.getUserId(userId);

    if (!project)
      return new NotFoundException('The given project is not valid');

    if (project.userId !== userId) {
      return new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }
  }
}
