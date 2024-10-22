import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from '../lib';
import { InfraModule } from 'src/infra/infra.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/strategy/local-strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [
    InfraModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'ICrypt',
      useClass: BcryptService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
