import { Project } from '@prisma/client';

export class ProjectsMapper {
  static projectCreationResponse(project: Project) {
    return {
      userId: project.userId,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    };
  }

  //   static updateResponseList(projects: Project[]) {
  //     return projects.map((project) => this.updateResponse(project));
  //   }
  // No need for it since you can't update more than 1 project at a time
}
