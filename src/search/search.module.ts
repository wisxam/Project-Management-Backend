import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { PrismaService } from 'src/infra/services/prisma.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SearchRepository, PrismaService],
})
export class SearchModule {}
