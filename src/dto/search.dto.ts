// import { Project, Task, User } from '@prisma/client';

// export class SearchDto {
//   user?: User[];
//   project?: Project[];
//   task?: Task[];

//   constructor(user: User[] = [], project: Project[] = [], task: Task[] = []) {
//     this.user = user;
//     this.project = project;
//     this.task = task;
//   }
// }

export class SearchDto {
  query?: string;
}
