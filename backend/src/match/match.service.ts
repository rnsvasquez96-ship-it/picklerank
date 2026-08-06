import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";

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

  // ✅ NEW - Get all matches for a tournament
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

  remove(id: number) {
    return this.prisma.match.delete({
      where: {
        id,
      },
    });
  }
}