import DashboardLayout from "@/components/layout/DashboardLayout";
import PlayerForm from "@/features/player/components/PlayerForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPlayerPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Player
          </h1>

          <p className="text-muted-foreground">
            Update player information.
          </p>
        </div>

        <PlayerForm
          playerId={Number(id)}
        />
      </div>
    </DashboardLayout>
  );
}