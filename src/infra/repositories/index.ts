// import { ProjectRepository } from './project.repositroy';
import { GeneratedInviteCodeRepository } from './generatedcode.repository';
import { InvitationRequestRepository } from './inviteRequests.repository';
import { ProjectsRepository } from './projects.repository';
import { TasksRepository } from './tasks.repository';
import { UserRepository } from './user.repository';

export default [
  TasksRepository,
  UserRepository,
  ProjectsRepository,
  GeneratedInviteCodeRepository,
  InvitationRequestRepository,
];
