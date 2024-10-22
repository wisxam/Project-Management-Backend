import { Injectable } from '@nestjs/common';
import { SearchDto } from 'src/dto/search.dto';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async search(query: SearchDto) {
    if (!query.query || query.query.length === 0) {
      return { tasks: [], users: [], projects: [] };
    }

    const tasks = await this.searchRepository.searchTasks(query);
    const users = await this.searchRepository.searchUsers(query);
    const projects = await this.searchRepository.searchProjects(query);

    return { tasks, users, projects };
  }
}
