import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getStats() {
    const totalPlayers =
      await this.prisma.player.count();

    const totalTournaments =
      await this.prisma.tournament.count();

    const totalMatches =
      await this.prisma.match.count();

    const completedMatches =
      await this.prisma.match.count({
        where: {
          status: "Completed",
        },
      });

    const upcoming =
      await this.prisma.tournament.count({
        where: {
          status: "Upcoming",
        },
      });

    const ongoing =
      await this.prisma.tournament.count({
        where: {
          status: "Ongoing",
        },
      });

    const completed =
      await this.prisma.tournament.count({
        where: {
          status: "Completed",
        },
      });

    const upcomingTournament =
      await this.prisma.tournament.findFirst({
        where: {
          status: "Upcoming",
        },
        orderBy: {
          startDate: "asc",
        },
      });

    const recentMatches =
      await this.prisma.match.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tournament: true,
          player1: true,
          player2: true,
          winner: true,
        },
      });

    return {
      totalPlayers,
      totalTournaments,
      totalMatches,
      completedMatches,

      upcoming,
      ongoing,
      completed,

      upcomingTournament,
      recentMatches,
    };
  }
}