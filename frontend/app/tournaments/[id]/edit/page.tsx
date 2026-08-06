import DashboardLayout from "@/components/layout/DashboardLayout";
import TournamentForm from "@/features/tournament/components/TournamentForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTournamentPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">
          Edit Tournament
        </h1>

        <p className="mb-8 text-muted-foreground">
          Update your tournament information.
        </p>

        <TournamentForm tournamentId={Number(id)} />
      </div>
    </DashboardLayout>
  );
}