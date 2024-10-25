import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './projects/projects.module';
import { InvitesModule } from './project_invite/invitation/request.module';

@Module({
  imports: [TasksModule, UserModule, AuthModule, ProjectModule, InvitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
