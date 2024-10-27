import {
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ICrypt } from '../lib';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { UserWithoutPassword } from 'src/dto/userRequest.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject('ICrypt') private cryptService: ICrypt,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    this.logger.log('Starting user validation...');
    const startTime = Date.now();

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.warn(`User not found for email: ${email}`);
      throw new UnauthorizedException('User not found');
    }

    // Compare the provided password with the stored password hash
    const check = await this.cryptService.comparePassword(
      password,
      user.password,
    );
    if (!check) {
      this.logger.warn(`Invalid password for email: ${email}`);
      throw new UnauthorizedException();
    }

    const endTime = Date.now();
    this.logger.log(`User validation completed in ${endTime - startTime}ms`);

    // Return user data excluding the password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(user: UserWithoutPassword, res: Response) {
    this.logger.log('Starting JWT token generation...');
    const startTime = Date.now();

    // Prepare JWT payload
    const payload = { email: user.email, sub: user.userId };
    // Sign the JWT token
    const token = this.jwtService.sign(payload);

    const endTime = Date.now();
    this.logger.log(`JWT token generated in ${endTime - startTime}ms`);

    // Set the token in an HTTP-only cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax', // Use lowercase for sameSite option
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Send user data without the token
    return res.send({
      userId: user.userId,
      email: user.email,
    });
  }
}
