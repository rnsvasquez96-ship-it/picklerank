import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePlayerDto) {
    return this.prisma.player.create({
      data,
    });
  }

  findAll() {
    return this.prisma.player.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.player.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({
      where: {
        id,
      },
    });
  }
}