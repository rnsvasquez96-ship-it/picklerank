import {
  Trophy,
  CircleDot,
  Swords,
} from "lucide-react";

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
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">

        <div className="rounded-2xl bg-blue-100 p-3">
          <Swords
            size={26}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Matches
          </h2>

          <p className="text-sm text-gray-500">
            Latest completed and ongoing matches.
          </p>
        </div>

      </div>

      <div className="p-6">

        {matches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
            <Swords
              size={40}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-medium">
              No matches found
            </p>

            <p className="mt-1 text-sm">
              Match results will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {matches.map((match) => {
              const completed =
                match.status === "Completed";

              const player1Winner =
                match.player1Score >
                match.player2Score;

              const player2Winner =
                match.player2Score >
                match.player1Score;

              return (
                <div
                  key={match.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Top */}
                  <div className="mb-5 flex items-center justify-between">

                    <h3 className="font-semibold text-gray-900">
                      Match #{match.id}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {match.status}
                    </span>

                  </div>

                  {/* Players */}

                  <div className="space-y-3">

                    <div
                      className={`flex items-center justify-between rounded-xl p-4 ${
                        player1Winner
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CircleDot
                          size={18}
                          className="text-blue-500"
                        />

                        <span className="font-medium">
                          {match.player1.name}
                        </span>

                        {player1Winner && (
                          <Trophy
                            size={16}
                            className="text-yellow-500"
                          />
                        )}
                      </div>

                      <span className="text-2xl font-bold">
                        {match.player1Score}
                      </span>
                    </div>

                    <div className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                      VS
                    </div>

                    <div
                      className={`flex items-center justify-between rounded-xl p-4 ${
                        player2Winner
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CircleDot
                          size={18}
                          className="text-red-500"
                        />

                        <span className="font-medium">
                          {match.player2.name}
                        </span>

                        {player2Winner && (
                          <Trophy
                            size={16}
                            className="text-yellow-500"
                          />
                        )}
                      </div>

                      <span className="text-2xl font-bold">
                        {match.player2Score}
                      </span>
                    </div>

                  </div>

                  {completed && (
                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-yellow-50 p-3 text-sm font-medium text-yellow-700">
                      <Trophy size={18} />
                      Winner:{" "}
                      {player1Winner
                        ? match.player1.name
                        : match.player2.name}
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}