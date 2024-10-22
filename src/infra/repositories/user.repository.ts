import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getMany(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOne(userId: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });
  }

  getUserProfile(userId: number): Promise<Omit<User, 'password'> | null> {
    return this.prismaService.user.findFirst({
      where: {
        userId,
      },
      select: {
        email: true,
        userId: true,
        username: true,
        profilePictureUrl: true,
        teamId: true,
      },
    });
  }

  create(dto: CreateUserRequest): Promise<User> {
    return this.prismaService.user.create({ data: dto });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findByName(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  findById(userId: number) {
    return this.prismaService.user.findFirst({
      where: { userId },
    });
  }

  deleteById(userId: number) {
    return this.prismaService.user.delete({
      where: { userId },
    });
  }
}

interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}
