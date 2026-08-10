import DashboardLayout from "@/components/layout/DashboardLayout";
import TournamentDetails from "@/features/tournament/components/TournamentDetails";
import RegistrationList from "@/features/registration/components/RegistrationList";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TournamentPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <TournamentDetails
          tournamentId={Number(id)}
        />

        <RegistrationList
          tournamentId={Number(id)}
        />
      </div>
    </DashboardLayout>
  );
}