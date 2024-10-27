import { Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Res() res: any) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
