export class UserProfileDto {
  userId: number;
  username: string;
  email: string;
  profilePictureUrl: string | null;
  teamId: number | null;

  constructor(user: {
    userId: number;
    username: string;
    email: string;
    profilePictureUrl: string | null;
    teamId: number | null;
  }) {
    this.userId = user.userId;
    this.username = user.username;
    this.email = user.email;
    this.profilePictureUrl = user.profilePictureUrl;
    this.teamId = user.teamId;
  }
}
