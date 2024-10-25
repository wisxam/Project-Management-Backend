import { Injectable, NotFoundException } from '@nestjs/common';
import { GeneratedInviteCodeRepository } from 'src/infra/repositories/generatedcode.repository';
import { InvitationRequestRepository } from 'src/infra/repositories/inviteRequests.repository';
import { UpdateInvitationRequestDto } from './dto/updateInvitationRequestDto';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { UserInfoDto } from './dto/userInfo';

@Injectable()
export class InvitationRequestService {
  constructor(
    private readonly generateInviteCodeService: GeneratedInviteCodeRepository,
    private readonly invitationRequestRepository: InvitationRequestRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createInvitationRequest(userId: number, inviteCode: string) {
    const generatedCodeForProjectId =
      await this.generateInviteCodeService.validateInviteCode(inviteCode);

    const user = await this.userRepository.getUserInfoByUserId(userId);

    const userInfo = {
      userName: user?.username,
      userEmail: user?.email,
    } as UserInfoDto;

    if (!generatedCodeForProjectId?.projectId) {
      throw new NotFoundException('Request code not found');
    }

    if (userId === generatedCodeForProjectId?.ownerUserId) {
      throw new NotFoundException(
        'You cannot request to join your own project',
      );
    }

    const checkInvitation =
      await this.invitationRequestRepository.checkRequestExists(
        userId,
        generatedCodeForProjectId?.projectId,
      );

    if (checkInvitation) {
      throw new NotFoundException('Request already exists');
    }

    return this.invitationRequestRepository.createInvitationRequest(
      userId,
      generatedCodeForProjectId?.projectId,
      generatedCodeForProjectId?.code,
      generatedCodeForProjectId?.ownerUserId,
      userInfo,
      generatedCodeForProjectId?.projectName,
    );
  }

  async getInvitationRequestsByOwnerId(userId: number) {
    return this.invitationRequestRepository.getInvitationRequestsByOwnerId(
      userId,
    );
  }

  async updateInvitationRequestStatus(
    requestId: number,
    status: UpdateInvitationRequestDto,
  ) {
    const request =
      await this.invitationRequestRepository.getInvitationRequestById(
        requestId,
      );
    if (!request) {
      throw new NotFoundException('Invitation request not found');
    }
    return this.invitationRequestRepository.updateInvitationRequestStatus(
      requestId,
      status.status,
    );
  }

  async deleteInvitationRequest(requestId: number) {
    const request =
      await this.invitationRequestRepository.getInvitationRequestById(
        requestId,
      );
    if (!request) {
      throw new NotFoundException('Invitation request not found');
    }
    return this.invitationRequestRepository.deleteInvitationRequest(requestId);
  }
}
