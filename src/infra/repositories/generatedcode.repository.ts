import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class GeneratedInviteCodeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async generatedInviteCode(
    projectId: number,
    code: string,
    projectOwner: number,
    projectName: string,
  ) {
    return this.prismaService.inviteCode.create({
      data: {
        code,
        projectId,
        ownerUserId: projectOwner,
        projectName,
        // expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async getInviteCode(projectId: number) {
    return this.prismaService.inviteCode.findFirst({
      where: {
        projectId,
      },
    });
  }

  async validateInviteCode(code: string) {
    return this.prismaService.inviteCode.findFirst({
      where: {
        code,
        // expiresAt: {
        //   gte: new Date(),
        // },
      },
    });
  }

  async deleteExpiredInviteCode() {
    return this.prismaService.inviteCode.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(), // Delete all expired invite codes
        },
      },
    });
  }

  async deleteInviteCode(projectId: number) {
    return this.prismaService.inviteCode.delete({
      where: {
        projectId,
      },
    });
  }
}
