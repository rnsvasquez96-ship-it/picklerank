type Match = {
  id: number;
  player1: {
    name: string;
  };
  player2: {
    name: string;
  };
  player1Score: number;
  player2Score: number;
  status: string;
};

type Props = {
  matches: Match[];
};

export default function RecentMatches({
  matches,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        🎾 Recent Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500">
          No matches found.
        </p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-lg border p-4"
            >
              <p className="font-semibold">
                {match.player1.name}
                {" "}
                vs
                {" "}
                {match.player2.name}
              </p>

              <p className="text-gray-600">
                Score:
                {" "}
                {match.player1Score}
                {" - "}
                {match.player2Score}
              </p>

              <span className="text-sm text-green-600">
                {match.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}