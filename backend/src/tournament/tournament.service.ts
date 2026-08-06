import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    private prisma: PrismaService,
  ) {}


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



  async findOne(id: number) {

    const tournament =
      await this.prisma.tournament.findUnique({
        where: {
          id,
        },
      });


    if (!tournament) {
      throw new NotFoundException(
        `Tournament with id ${id} not found`
      );
    }


    return tournament;
  }



  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ) {

    const tournament =
      await this.prisma.tournament.findUnique({
        where: {
          id,
        },
      });


    if (!tournament) {
      throw new NotFoundException(
        `Tournament with id ${id} not found`
      );
    }


    return this.prisma.tournament.update({
      where: {
        id,
      },

      data: updateTournamentDto,
    });
  }

  async generateBracket(
  tournamentId: number,
) {
  // Check tournament exists
  const tournament =
    await this.prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
    });

  if (!tournament) {
    throw new NotFoundException(
      `Tournament with id ${tournamentId} not found`,
    );
  }

  // Get registered players
  const registrations =
    await this.prisma.registration.findMany({
      where: {
        tournamentId,
      },
      orderBy: {
        seed: 'asc',
      },
    });

  if (registrations.length < 2) {
    throw new NotFoundException(
      'At least 2 registered players are required.',
    );
  }

  // Prevent generating twice
  const existingMatches =
    await this.prisma.match.count({
      where: {
        tournamentId,
      },
    });

  if (existingMatches > 0) {
    throw new Error(
      'Bracket has already been generated.',
    );
  }

  const matches: Awaited<
  ReturnType<typeof this.prisma.match.create>
  >[] = [];

  // Pair players
  for (
    let i = 0;
    i < registrations.length;
    i += 2
  ) {
    const player1 = registrations[i];
    const player2 = registrations[i + 1];

    // Bye if odd number of players
    if (!player2) {
      break;
    }

    const match =
      await this.prisma.match.create({
        data: {
          tournamentId,

          player1Id: player1.playerId,

          player2Id: player2.playerId,

          round: 1,

          status: 'Scheduled',
        },
      });

    matches.push(match);
  }

  return {
    message: 'Bracket generated successfully.',
    matches,
  };
}


  async remove(id: number) {

    const tournament =
      await this.prisma.tournament.findUnique({
        where: {
          id,
        },
      });


    if (!tournament) {
      throw new NotFoundException(
        `Tournament with id ${id} not found`
      );
    }


    return this.prisma.tournament.delete({
      where: {
        id,
      },
    });
  }
}