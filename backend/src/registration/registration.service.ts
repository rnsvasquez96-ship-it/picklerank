import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

async create(data: CreateRegistrationDto) {
  const exists =
    await this.prisma.registration.findFirst({
      where: {
        tournamentId: data.tournamentId,
        playerId: data.playerId,
      },
    });

  if (exists) {
    throw new Error(
      "Player is already registered."
    );
  }

  return this.prisma.registration.create({
    data,
    include: {
      player: true,
      tournament: true,
    },
  });
}

  findByTournament(tournamentId: number) {
    return this.prisma.registration.findMany({
      where: {
        tournamentId,
      },
      include: {
        player: true,
      },
      orderBy: {
        seed: "asc",
      },
    });
  }

  remove(id: number) {
    return this.prisma.registration.delete({
      where: {
        id,
      },
    });
  }
}