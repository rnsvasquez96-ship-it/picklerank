import DashboardLayout from "@/components/layout/DashboardLayout";
import { getTournamentStandings } from "@/lib/ranking";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Standing = {
  rank: number;
  playerId: number;
  name: string;
  wins: number;
  losses: number;
  played: number;
  winPercentage: number;
  pointsFor: number;
  pointsAgainst: number;
};

export default async function TournamentStandingsPage({
  params,
}: Props) {
  const { id } = await params;

  const standings: Standing[] =
    await getTournamentStandings(Number(id));

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Tournament Standings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Live rankings based on completed matches.
          </p>
        </div>

        {standings.length === 0 ? (
          <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">🏆</div>

            <h2 className="mt-4 text-xl font-semibold">
              No standings available
            </h2>

            <p className="mt-2 text-gray-500">
              Complete tournament matches to generate standings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">
                    Rank
                  </th>

                  <th className="p-4 text-left">
                    Player
                  </th>

                  <th className="p-4 text-center">
                    Wins
                  </th>

                  <th className="p-4 text-center">
                    Losses
                  </th>

                  <th className="p-4 text-center">
                    Played
                  </th>

                  <th className="p-4 text-center">
                    Win %
                  </th>

                  <th className="p-4 text-center">
                    PF
                  </th>

                  <th className="p-4 text-center">
                    PA
                  </th>
                </tr>
              </thead>

              <tbody>
                {standings.map((player) => (
                  <tr
                    key={player.playerId}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="p-4 font-bold">
                      {player.rank === 1 && "🥇 "}
                      {player.rank === 2 && "🥈 "}
                      {player.rank === 3 && "🥉 "}
                      {player.rank}
                    </td>

                    <td className="p-4 font-medium">
                      {player.name}
                    </td>

                    <td className="p-4 text-center">
                      {player.wins}
                    </td>

                    <td className="p-4 text-center">
                      {player.losses}
                    </td>

                    <td className="p-4 text-center">
                      {player.played}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          player.winPercentage >= 75
                            ? "bg-green-100 text-green-700"
                            : player.winPercentage >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {player.winPercentage}%
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {player.pointsFor}
                    </td>

                    <td className="p-4 text-center">
                      {player.pointsAgainst}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}