import {
  Trophy,
  Medal,
  Award,
} from "lucide-react";

type Ranking = {
  rank: number;
  player: string;
  wins: number;
  losses: number;
  played: number;
  winPercentage: number;
  pointsFor: number;
  pointsAgainst: number;
};

type Props = {
  rankings: Ranking[];
};

export default function RankingTable({
  rankings,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b bg-gray-50 px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Leaderboard
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Rankings are automatically updated after completed matches.
        </p>
      </div>

      {rankings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Trophy
            size={56}
            className="text-gray-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No rankings available
          </h3>

          <p className="mt-2 text-gray-500">
            Complete tournament matches to generate rankings.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">
              <tr className="text-sm font-semibold text-gray-700">

                <th className="px-6 py-4 text-center">
                  Rank
                </th>

                <th className="px-6 py-4 text-left">
                  Player
                </th>

                <th className="px-6 py-4 text-center">
                  Played
                </th>

                <th className="px-6 py-4 text-center">
                  Wins
                </th>

                <th className="px-6 py-4 text-center">
                  Losses
                </th>

                <th className="px-6 py-4 text-center">
                  Win %
                </th>

                <th className="px-6 py-4 text-center">
                  PF
                </th>

                <th className="px-6 py-4 text-center">
                  PA
                </th>

              </tr>
            </thead>

            <tbody>

              {rankings.map((player) => (

                <tr
                  key={player.rank}
                  className="border-t transition hover:bg-green-50"
                >

                  <td className="px-6 py-5 text-center">

                    {player.rank === 1 ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-yellow-100 p-2">
                        <Trophy
                          size={18}
                          className="text-yellow-600"
                        />
                      </span>
                    ) : player.rank === 2 ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2">
                        <Medal
                          size={18}
                          className="text-gray-600"
                        />
                      </span>
                    ) : player.rank === 3 ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-orange-100 p-2">
                        <Award
                          size={18}
                          className="text-orange-600"
                        />
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-700">
                        #{player.rank}
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-5">

                    <div>
                      <p className="font-semibold text-gray-900">
                        {player.player}
                      </p>

                      <p className="text-sm text-gray-500">
                        PickleRank Player
                      </p>
                    </div>

                  </td>

                  <td className="px-6 py-5 text-center font-medium">
                    {player.played}
                  </td>

                  <td className="px-6 py-5 text-center font-semibold text-green-600">
                    {player.wins}
                  </td>

                  <td className="px-6 py-5 text-center font-semibold text-red-500">
                    {player.losses}
                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {player.winPercentage}%
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">
                    {player.pointsFor}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {player.pointsAgainst}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}