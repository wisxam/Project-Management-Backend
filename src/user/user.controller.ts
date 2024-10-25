import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { JwtAuthGuard } from 'src/guards';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMany() {
    const users = await this.userService.getMany();

    return UserMapper.toResponseList(users);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);

    return UserMapper.toResponse(user);
  }

  @Get(':userId')
  async getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteUserById(@Req() req: any) {
    const user = req.user.userId;

    const deletedUser = await this.userService.deleteUserById(user);

    return UserMapper.toResponse(deletedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/request-invite')
  async requestInvite(@Query('id', ParseIntPipe) id: number, @Req() req: any) {
    const user = req.user.userId;

    return this.userService.acceptInvitation(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/invites')
  async getInvites(@Req() req: any) {
    const user = req.user.userId;
    const request = await this.userService.getInvitationRequestsByUserId(user);

    return request.map((request) => UserMapper.requestMessage(request));
  }
}
