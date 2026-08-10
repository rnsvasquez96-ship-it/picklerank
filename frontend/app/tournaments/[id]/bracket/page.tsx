import DashboardLayout from "@/components/layout/DashboardLayout";
import Bracket from "@/features/bracket/components/Bracket";
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

  const matches = await getBracket(Number(id));

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Tournament Bracket
          </h1>

          <p className="text-muted-foreground">
            View tournament rounds and match progress.
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <h2 className="text-lg font-semibold">
              No bracket generated yet
            </h2>

            <p className="mt-2 text-gray-500">
              Generate the tournament bracket from the tournament details page
              to begin scheduling matches.
            </p>
          </div>
        ) : (
          <Bracket matches={matches} />
        )}
      </div>
    </DashboardLayout>
  );
}