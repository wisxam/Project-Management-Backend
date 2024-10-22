import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { BcryptService } from '../lib';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [InfraModule],
  providers: [
    UserService,
    {
      provide: 'ICrypt',
      useClass: BcryptService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
