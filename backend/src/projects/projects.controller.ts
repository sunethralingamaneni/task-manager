import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.projectsService.create(req.user.userId, body);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(Number(id));
  }
}