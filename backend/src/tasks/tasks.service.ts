import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.task.create({
      data,
    });
  }

  getByProject(projectId: number) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  updateStatus(taskId: number, status: string) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
  }

  delete(taskId: number) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}