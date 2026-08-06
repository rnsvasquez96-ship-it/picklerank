import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
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
          player1: true,
          player2: true,
        },
      });

    return {
      totalPlayers,
      totalTournaments,
      totalMatches,
      completedMatches,
      upcomingTournament,
      recentMatches,
    };
  }
}