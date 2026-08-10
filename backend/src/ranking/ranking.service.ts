import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RankingService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getRankings() {
    const players =
      await this.prisma.player.findMany();

    const matches =
      await this.prisma.match.findMany({
        where: {
          status: "Completed",
        },
      });

    const rankings = players.map((player) => {
      let wins = 0;
      let losses = 0;
      let pointsFor = 0;
      let pointsAgainst = 0;

      matches.forEach((match) => {
        if (match.player1Id === player.id) {
          pointsFor += match.player1Score;
          pointsAgainst += match.player2Score;

          if (match.winnerId === player.id) {
            wins++;
          } else {
            losses++;
          }
        }

        if (match.player2Id === player.id) {
          pointsFor += match.player2Score;
          pointsAgainst += match.player1Score;

          if (match.winnerId === player.id) {
            wins++;
          } else {
            losses++;
          }
        }
      });

      const played = wins + losses;

      return {
        id: player.id,
        player: player.name,
        wins,
        losses,
        played,
        winPercentage:
          played === 0
            ? 0
            : Number(
                (
                  (wins / played) *
                  100
                ).toFixed(1)
              ),
        pointsFor,
        pointsAgainst,
      };
    });

    rankings.sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      return (
        b.pointsFor - a.pointsFor
      );
    });

    return rankings.map(
      (player, index) => ({
        rank: index + 1,
        ...player,
      }),
    );
  }

  // ✅ Tournament standings
  async getTournamentStandings(
    tournamentId: number,
  ) {
    const registrations =
      await this.prisma.registration.findMany({
        where: {
          tournamentId,
        },
        include: {
          player: true,
        },
      });

    const matches =
      await this.prisma.match.findMany({
        where: {
          tournamentId,
          status: "Completed",
        },
      });

    const standings = registrations.map(
      ({ player }) => {
        let wins = 0;
        let losses = 0;
        let pointsFor = 0;
        let pointsAgainst = 0;

        matches.forEach((match) => {
          if (match.player1Id === player.id) {
            pointsFor += match.player1Score;
            pointsAgainst += match.player2Score;

            if (match.winnerId === player.id) {
              wins++;
            } else {
              losses++;
            }
          }

          if (match.player2Id === player.id) {
            pointsFor += match.player2Score;
            pointsAgainst += match.player1Score;

            if (match.winnerId === player.id) {
              wins++;
            } else {
              losses++;
            }
          }
        });

        return {
          id: player.id,
          name: player.name,
          wins,
          losses,
          played: wins + losses,
          pointsFor,
          pointsAgainst,
        };
      },
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
}