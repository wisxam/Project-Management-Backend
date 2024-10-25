import { IsString } from 'class-validator';

export class UpdateInvitationRequestDto {
  @IsString()
  status!: RequestStatus;
}

export enum RequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  denied = 'denied',
}
