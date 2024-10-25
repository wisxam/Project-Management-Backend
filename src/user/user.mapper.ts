import { InvitationRequest, User } from '@prisma/client';

export class UserMapper {
  static toResponse(user: User) {
    return {
      id: user.userId,
      name: user.username,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
      teamId: user.teamId,
    };
  }

  static requestMessage(request: InvitationRequest) {
    return {
      status: request.status,
      userIdRequest: request.userIdRequest,
      projectId: request.projectId,
      inviteCodeId: request.inviteCodeId,
    };
  }

  static toResponseList(user: User[]) {
    return user.map((user) => this.toResponse(user));
  }

  // static toResponseGetUserById(user: { username: string; email: string }) {
  //   return {
  //     name: user.username,
  //     email: user.email,
  //   };
  // }
}
