import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsRepository } from 'src/infra/repositories/projects.repository';
import { CreateProjectDto } from './dto/createProjectDto';
import { UpdateProjectDto } from './dto/updateProjectDto';
import { GeneratedInviteCodeRepository } from 'src/infra/repositories/generatedcode.repository';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { UsersProjectDto } from 'src/user/dto/userproject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly generatedCodeRepository: GeneratedInviteCodeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserId(userId: number) {
    if (!userId) return new UnauthorizedException('User Id is not valid');
  }

  async createProject(userId: number, projectDto: CreateProjectDto) {
    const code = uuidv4().slice(0, 6).toUpperCase();

    this.getUserId(userId);

    const project = await this.projectsRepository.createProject(
      userId,
      projectDto,
    );

    const user = await this.userRepository.getUserProfile(userId);

    await this.userRepository.addProjectCreator(user as UsersProjectDto);

    await this.generatedCodeRepository.generatedInviteCode(
      project.id,
      code,
      userId,
      project.name,
    );

    return project;
  }

  async getProjects(userId: number) {
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

    const projectCode = this.generatedCodeRepository.getInviteCode(projectId);

    if (!projectCode) {
      throw new NotFoundException('Project code not found');
    }

    await this.generatedCodeRepository.deleteInviteCode(projectId);

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

  async getAccessedProjects(userId: number) {
    const accessedProject =
      await this.projectsRepository.getUserAccessedProjects(userId);

    if (!accessedProject) {
      throw new Error(`No accessed projects found for user with ID: ${userId}`);
    }

    return accessedProject;
  }
}
