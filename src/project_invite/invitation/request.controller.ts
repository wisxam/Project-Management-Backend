import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards';
import { InvitationRequestService } from './request.service';
import { CreateInvitationRequestDto } from './dto/createInvitationRequestDto';
import { UpdateInvitationRequestDto } from './dto/updateInvitationRequestDto';

@Controller('invitation-requests')
export class InvitationRequestController {
  constructor(
    private readonly invitationRequestService: InvitationRequestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createInvitationRequest(
    @Body() inviteCode: CreateInvitationRequestDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.invitationRequestService.createInvitationRequest(
      userId,
      inviteCode.inviteCode,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getInvitationRequestsByOwnerId(@Req() req: any) {
    const userId = req.user.userId;

    return this.invitationRequestService.getInvitationRequestsByOwnerId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':requestId')
  updateInvitationRequestStatus(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Body() updateDto: UpdateInvitationRequestDto,
  ) {
    return this.invitationRequestService.updateInvitationRequestStatus(
      requestId,
      updateDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':requestId')
  deleteInvitationRequest(@Param('requestId', ParseIntPipe) requestId: number) {
    return this.invitationRequestService.deleteInvitationRequest(requestId);
  }
}
