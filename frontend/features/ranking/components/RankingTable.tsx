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
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Player</th>
            <th className="px-4 py-3 text-center">Played</th>
            <th className="px-4 py-3 text-center">Wins</th>
            <th className="px-4 py-3 text-center">Losses</th>
            <th className="px-4 py-3 text-center">Win %</th>
            <th className="px-4 py-3 text-center">PF</th>
            <th className="px-4 py-3 text-center">PA</th>
          </tr>
        </thead>

        <tbody>
          {rankings.map((player) => (
            <tr
              key={player.rank}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-bold">
                {player.rank === 1
                  ? "🥇"
                  : player.rank === 2
                  ? "🥈"
                  : player.rank === 3
                  ? "🥉"
                  : player.rank}
              </td>

              <td className="px-4 py-3">
                {player.player}
              </td>

              <td className="px-4 py-3 text-center">
                {player.played}
              </td>

              <td className="px-4 py-3 text-center">
                {player.wins}
              </td>

              <td className="px-4 py-3 text-center">
                {player.losses}
              </td>

              <td className="px-4 py-3 text-center">
                {player.winPercentage}%
              </td>

              <td className="px-4 py-3 text-center">
                {player.pointsFor}
              </td>

              <td className="px-4 py-3 text-center">
                {player.pointsAgainst}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}