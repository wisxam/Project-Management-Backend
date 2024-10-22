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

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private projectRepository: ProjectsRepository,
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
}
