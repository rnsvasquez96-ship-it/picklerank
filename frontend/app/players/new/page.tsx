import DashboardLayout from "@/components/layout/DashboardLayout";
import PlayerForm from "@/features/player/components/PlayerForm";

export default function NewPlayerPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            New Player
          </h1>

          <p className="text-muted-foreground">
            Add a new player to the system.
          </p>
        </div>

        <PlayerForm />
      </div>
    </DashboardLayout>
  );
}