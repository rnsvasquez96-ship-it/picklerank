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
      <div className="mx-auto max-w-4xl p-8">
        <PlayerDetails
          playerId={Number(id)}
        />
      </div>
    </DashboardLayout>
  );
}