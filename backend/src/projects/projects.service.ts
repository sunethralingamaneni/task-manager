import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, data: any) {
    return this.prisma.project.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
    });
  }

  delete(projectId: number) {
    return this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }
}