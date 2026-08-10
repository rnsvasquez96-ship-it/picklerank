import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { UpdateResultDto } from "./dto/update-result.dto";

@Injectable()
export class MatchService {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateMatchDto) {
    return this.prisma.match.create({
      data,
    });
  }

  findAll() {
    return this.prisma.match.findMany({
      include: {
        tournament: true,
        player1: true,
        player2: true,
        winner: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByTournament(
    tournamentId: number,
  ) {
    return this.prisma.match.findMany({
      where: {
        tournamentId,
      },
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
      orderBy: [
        {
          round: "asc",
        },
        {
          id: "asc",
        },
      ],
    });
  }

  async findOne(id: number) {
    const match =
      await this.prisma.match.findUnique({
        where: {
          id,
        },
        include: {
          tournament: true,
          player1: true,
          player2: true,
          winner: true,
        },
      });

    if (!match) {
      throw new NotFoundException(
        `Match with id ${id} not found`,
      );
    }

    return match;
  }

  async updateResult(
    id: number,
    data: UpdateResultDto,
  ) {
    const match =
      await this.prisma.match.findUnique({
        where: {
          id,
        },
      });

    if (!match) {
      throw new NotFoundException(
        `Match with id ${id} not found`,
      );
    }

    if (!match.player1Id || !match.player2Id) {
      throw new BadRequestException(
        "Both players must be assigned before recording a score.",
      );
    }

    if (
      data.player1Score ===
      data.player2Score
    ) {
      throw new BadRequestException(
        "A pickleball match cannot end in a tie.",
      );
    }

    const winnerId =
      data.player1Score >
      data.player2Score
        ? match.player1Id
        : match.player2Id;

    const updatedMatch =
      await this.prisma.match.update({
        where: {
          id,
        },
        data: {
          player1Score:
            data.player1Score,
          player2Score:
            data.player2Score,
          winnerId,
          status: "Completed",
        },
        include: {
          tournament: true,
          player1: true,
          player2: true,
          winner: true,
        },
      });

    const totalMatches =
      await this.prisma.match.count({
        where: {
          tournamentId:
            updatedMatch.tournamentId,
        },
      });

    const finalRound = Math.ceil(
      Math.log2(totalMatches + 1),
    );

    // ===============================
    // Advance winner to next round
    // ===============================

    const nextRound =
      match.round + 1;

    const nextMatches =
      await this.prisma.match.findMany({
        where: {
          tournamentId:
            match.tournamentId,
          round: nextRound,
        },
        orderBy: {
          id: "asc",
        },
      });

    if (nextMatches.length > 0) {
      const currentRoundMatches =
        await this.prisma.match.findMany({
          where: {
            tournamentId:
              match.tournamentId,
            round: match.round,
          },
          orderBy: {
            id: "asc",
          },
        });

      const currentIndex =
        currentRoundMatches.findIndex(
          (m) => m.id === match.id,
        );

      if (currentIndex !== -1) {
        const nextMatchIndex =
          Math.floor(
            currentIndex / 2,
          );

        const nextMatch =
          nextMatches[nextMatchIndex];

        if (nextMatch) {
          if (
            currentIndex % 2 === 0
          ) {
            await this.prisma.match.update({
              where: {
                id: nextMatch.id,
              },
              data: {
                player1Id:
                  winnerId,
              },
            });
          } else {
            await this.prisma.match.update({
              where: {
                id: nextMatch.id,
              },
              data: {
                player2Id:
                  winnerId,
              },
            });
          }
        }
      }
    }

    // ===============================
    // Set Champion if Final Match
    // ===============================

    if (
      updatedMatch.round === finalRound
    ) {
      await this.prisma.tournament.update({
        where: {
          id: updatedMatch.tournamentId,
        },
        data: {
          championId: winnerId,
          status: "Completed",
        },
      });
    }

    return updatedMatch;
  }

  update(
    id: number,
    data: UpdateMatchDto,
  ) {
    return this.prisma.match.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    const match =
      await this.prisma.match.findUnique({
        where: {
          id,
        },
      });

    if (!match) {
      throw new NotFoundException(
        `Match with id ${id} not found`,
      );
    }

    return this.prisma.match.delete({
      where: {
        id,
      },
    });
  }
}