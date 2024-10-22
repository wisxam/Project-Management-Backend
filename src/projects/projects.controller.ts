import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/guards';
import { CreateProjectDto } from './dto/createProjectDto';
import { UpdateProjectDto } from './dto/updateProjectDto';
// import { ProjectsMapper } from './projects.mapper';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Body() body: CreateProjectDto, @Req() req: any) {
    const user = req.user;
    return this.projectService.createProject(user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProjects(@Req() req: any) {
    const user = req.user;
    return this.projectService.getProjects(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:projectId')
  async updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectDto: UpdateProjectDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.projectService.updateProject(projectId, projectDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:projectId')
  async deleteProjects(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    await this.projectService.deleteProject(projectId, userId);
    return { message: 'Project deleted successfully' };
  }
}
