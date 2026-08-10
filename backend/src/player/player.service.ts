import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from "./dto/update-player.dto";

@Injectable()
export class PlayerService {
  constructor(
    private prisma: PrismaService,
  ) {}

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

  async findOne(id: number) {
    return this.prisma.player.findUnique({
      where: {
        id,
      },
    });
  }

  // ✅ NEW
  async getPlayerStats(id: number) {
    const player =
      await this.prisma.player.findUnique({
        where: {
          id,
        },
      });

    if (!player) {
      throw new NotFoundException(
        `Player with id ${id} not found`,
      );
    }

    const matches =
      await this.prisma.match.findMany({
        where: {
          status: 'Completed',
          OR: [
            {
              player1Id: id,
            },
            {
              player2Id: id,
            },
          ],
        },
        include: {
          tournament: true,
          winner: true,
          player1: true,
          player2: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    let wins = 0;
    let losses = 0;
    let pointsFor = 0;
    let pointsAgainst = 0;

    matches.forEach((match) => {
      if (match.player1Id === id) {
        pointsFor += match.player1Score;
        pointsAgainst += match.player2Score;
      }

      if (match.player2Id === id) {
        pointsFor += match.player2Score;
        pointsAgainst += match.player1Score;
      }

      if (match.winnerId === id) {
        wins++;
      } else {
        losses++;
      }
    });

    const championships =
      await this.prisma.tournament.count({
        where: {
          championId: id,
        },
      });

    return {
      player,
      wins,
      losses,
      played: wins + losses,
      winPercentage:
        wins + losses === 0
          ? 0
          : Number(
              (
                (wins /
                  (wins + losses)) *
                100
              ).toFixed(1),
            ),
      pointsFor,
      pointsAgainst,
      championships,
      recentMatches: matches,
    };
  }

  async update(
  id: number,
  data: UpdatePlayerDto,
) {
  const player =
    await this.prisma.player.findUnique({
      where: {
        id,
      },
    });

  if (!player) {
    throw new NotFoundException(
      `Player with id ${id} not found`,
    );
  }

  return this.prisma.player.update({
    where: {
      id,
    },
    data,
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