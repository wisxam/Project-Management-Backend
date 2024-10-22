// import { Attachment, User } from '@prisma/client';

export class TaskDto {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate?: Date;
  dueDate?: Date;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  constructor(
    title: string,
    projectId: number,
    authorUserId: number,
    description?: string,
    status?: string,
    priority?: string,
    tags?: string,
    startDate?: Date,
    dueDate?: Date,
    points?: number,
    assignedUserId?: number,
  ) {
    this.title = title;
    this.projectId = projectId;
    this.authorUserId = authorUserId;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.tags = tags;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.points = points;
    this.assignedUserId = assignedUserId;
  }
}
