import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
    console.log('JwtService injected:', this.jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    console.log('JwtService injected:', this.jwtService);

    console.log('Token:', token);

    if (!token) {
      console.error('No token found in cookies');
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token); // Use verifyAsync for async handling
      request.user = decoded;
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
