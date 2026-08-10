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
    include: {
      champion: true,
    },
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
        include: {
        champion: true,
        },
        });


    if (!tournament) {
      throw new NotFoundException(
        `Tournament with id ${id} not found`
      );
    }


    return tournament;
  }

  async getProgress(id: number) {
  const tournament =
    await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        champion: true,
      },
    });

  if (!tournament) {
    throw new NotFoundException(
      `Tournament with id ${id} not found`,
    );
  }

  const totalMatches =
    await this.prisma.match.count({
      where: {
        tournamentId: id,
      },
    });

  const completedMatches =
    await this.prisma.match.count({
      where: {
        tournamentId: id,
        status: "Completed",
      },
    });

  const remainingMatches =
    totalMatches - completedMatches;

  const progress =
    totalMatches === 0
      ? 0
      : Math.round(
          (completedMatches / totalMatches) * 100,
        );

  return {
    tournamentId: tournament.id,
    tournament: tournament.name,
    status: tournament.status,

    totalMatches,
    completedMatches,
    remainingMatches,
    progress,

    champion: tournament.champion,
  };
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

  const matches: any[] = [];

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
  async getStandings(id: number) {
  const tournament =
    await this.prisma.tournament.findUnique({
      where: {
        id,
      },
    });

  if (!tournament) {
    throw new NotFoundException(
      `Tournament with id ${id} not found`,
    );
  }

  const registrations =
    await this.prisma.registration.findMany({
      where: {
        tournamentId: id,
      },
      include: {
        player: true,
      },
    });

  const standings = await Promise.all(
    registrations.map(async (registration) => {
      const playerId = registration.playerId;

      const matches =
        await this.prisma.match.findMany({
          where: {
            tournamentId: id,
            status: "Completed",
            OR: [
              {
                player1Id: playerId,
              },
              {
                player2Id: playerId,
              },
            ],
          },
        });

      const wins = matches.filter(
        (m) => m.winnerId === playerId,
      ).length;

      const losses = matches.length - wins;

      let pointsFor = 0;
      let pointsAgainst = 0;

      for (const match of matches) {
        if (match.player1Id === playerId) {
          pointsFor += match.player1Score;
          pointsAgainst += match.player2Score;
        } else {
          pointsFor += match.player2Score;
          pointsAgainst += match.player1Score;
        }
      }

      return {
        playerId,
        name: registration.player.name,
        wins,
        losses,
        played: matches.length,
        winPercentage:
          matches.length === 0
            ? 0
            : Math.round(
                (wins / matches.length) * 100,
              ),
        pointsFor,
        pointsAgainst,
      };
    }),
  );

  standings.sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }

    return (
      b.pointsFor - a.pointsFor
    );
  });

  return standings.map(
    (player, index) => ({
      rank: index + 1,
      ...player,
    }),
  );
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