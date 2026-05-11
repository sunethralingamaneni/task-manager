import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() body) {
    return this.tasksService.create(body);
  }

  @UseGuards(JwtGuard)
  @Get(':projectId')
  getTasks(@Param('projectId') projectId: string) {
    return this.tasksService.getByProject(Number(projectId));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() body,
  ) {
    return this.tasksService.updateStatus(
      Number(id),
      body.status,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }
}