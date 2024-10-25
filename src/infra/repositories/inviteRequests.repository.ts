import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { InvitationRequest } from '@prisma/client';
import { UserInfoDto } from 'src/project_invite/invitation/dto/userInfo';

@Injectable()
export class InvitationRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createInvitationRequest(
    userIdRequest: number,
    projectId: number,
    inviteCodeId: string,
    projectOwnerId: number,
    userInfo: UserInfoDto,
  ) {
    return this.prismaService.invitationRequest.create({
      data: {
        userIdRequest,
        projectId,
        inviteCodeId,
        projectOwnerId,
        ...userInfo,
      },
    });
  }

  async getInvitationRequestsByOwnerId(
    userId: number,
  ): Promise<InvitationRequest[]> {
    return this.prismaService.invitationRequest.findMany({
      where: { projectOwnerId: userId },
    });
  }

  async updateInvitationRequestStatus(
    requestId: number,
    status: RequestStatus,
  ): Promise<InvitationRequest> {
    return this.prismaService.invitationRequest.update({
      where: { id: requestId },
      data: { status },
    });
  }

  async getInvitationRequestById(
    requestId: number,
  ): Promise<InvitationRequest | null> {
    return this.prismaService.invitationRequest.findUnique({
      where: { id: requestId },
    });
  }

  async deleteInvitationRequest(requestId: number): Promise<InvitationRequest> {
    return this.prismaService.invitationRequest.delete({
      where: { id: requestId },
    });
  }

  async getInvitationRequestsByUserId(
    projectOwnerId: number,
  ): Promise<InvitationRequest[]> {
    return this.prismaService.invitationRequest.findMany({
      where: { projectOwnerId },
    });
  }

  async checkRequestExists(userIdRequest: number, projectId: number) {
    return this.prismaService.invitationRequest.findFirst({
      where: {
        userIdRequest,
        projectId,
      },
    });
  }
}

export enum RequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  denied = 'denied',
}
