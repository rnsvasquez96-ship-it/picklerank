import DashboardLayout from "@/components/layout/DashboardLayout";
import TournamentForm from "@/components/tournaments/TournamentForm";

export default function NewTournamentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Create Tournament
          </h1>

          <p className="text-muted-foreground">
            Fill in the tournament details below.
          </p>
        </div>

        <TournamentForm />
      </div>
    </DashboardLayout>
  );
}