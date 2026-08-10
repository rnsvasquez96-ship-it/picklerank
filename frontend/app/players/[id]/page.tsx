import DashboardLayout from "@/components/layout/DashboardLayout";
import PlayerDetails from "@/features/player/components/PlayerDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Player Profile
          </h1>

          <p className="text-muted-foreground">
            View player information, statistics, and match history.
          </p>
        </div>

        <PlayerDetails
          playerId={Number(id)}
        />
      </div>
    </DashboardLayout>
  );
}