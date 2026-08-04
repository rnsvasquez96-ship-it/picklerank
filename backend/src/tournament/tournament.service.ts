import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.prisma.tournament.create({
      data: createTournamentDto,
    });
  }

  findAll() {
    return this.prisma.tournament.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.tournament.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: updateTournamentDto,
    });
  }

  remove(id: number) {
    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}