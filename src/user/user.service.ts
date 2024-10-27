import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../infra/repositories/user.repository';
import { ProjectsRepository } from '../infra/repositories/projects.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { ICrypt } from '../lib';
import { User } from '@prisma/client';
import {
  InvitationRequestRepository,
  RequestStatus,
} from 'src/infra/repositories/inviteRequests.repository';
import { UsersProjectDto } from './dto/userproject.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private projectRepository: ProjectsRepository,
    private invitationRequestRepository: InvitationRequestRepository,
    @Inject('ICrypt') private cryptService: ICrypt,
  ) {}

  getMany() {
    return this.userRepository.getMany();
  }

  async checkUserCredentials(username: string, email: string) {
    const [isTakenEmail, isUsernameTaken] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByName(username),
    ]);

    if (isUsernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    if (isTakenEmail) {
      throw new ConflictException('Email is already taken');
    }
  }

  async getOne(userId: number) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const password = await this.cryptService.hashPassword(dto.password);

    await this.checkUserCredentials(dto.username, dto.email);

    return this.userRepository.create({
      password,
      username: dto.username,
      email: dto.email,
    });
  }

  async getOneById(userId: number) {
    return this.getOne(userId);
  }

  async deleteUserById(userId: number) {
    await this.projectRepository.deleteProjects(userId);

    return this.userRepository.deleteById(userId);
  }

  async acceptInvitation(requestId: number, userId: number) {
    const request =
      await this.invitationRequestRepository.getInvitationRequestById(
        requestId,
      );

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    const user = await this.userRepository.findById(request.userIdRequest);

    if (!user || userId) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.addUserToProject(
      request.projectId,
      user as UsersProjectDto,
    );

    return this.invitationRequestRepository.updateInvitationRequestStatus(
      requestId,
      'accepted' as RequestStatus,
    );
  }

  async getInvitationRequestsByUserId(userId: number) {
    return this.invitationRequestRepository.getInvitationRequestsByUserId(
      userId,
    );
  }

  async getTasksByUserId(userId: number) {
    const accessedProject =
      await this.projectRepository.getUserAccessedProjects(userId);

    if (!accessedProject) {
      throw new Error(`No accessed projects found for user with ID: ${userId}`);
    }

    return this.userRepository.getTasksByUserId(userId);
  }
}
