import DashboardLayout from "@/components/layout/DashboardLayout";
import { getBracket } from "@/lib/bracket";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BracketPage({
  params,
}: Props) {
  const { id } = await params;

  const matches = await getBracket(
    Number(id),
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-8 text-3xl font-bold">
          Tournament Bracket
        </h1>

        {matches.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            No bracket generated yet.
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match: any) => (
              <div
                key={match.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-bold">
                    Round {match.round}
                  </h2>

                  <span className="rounded bg-blue-100 px-3 py-1 text-sm">
                    {match.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between rounded bg-gray-100 p-3">
                    <span>
                      {match.player1.name}
                    </span>

                    <strong>
                      {match.player1Score}
                    </strong>
                  </div>

                  <div className="flex justify-between rounded bg-gray-100 p-3">
                    <span>
                      {match.player2.name}
                    </span>

                    <strong>
                      {match.player2Score}
                    </strong>
                  </div>
                </div>

                {match.winner && (
                  <p className="mt-4 text-green-600 font-semibold">
                    🏆 Winner:{" "}
                    {match.winner.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}