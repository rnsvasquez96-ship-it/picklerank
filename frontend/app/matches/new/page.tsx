import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchForm from "@/features/match/components/MatchForm";

export default function NewMatchPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6 p-8">

        <div>
          <h1 className="text-3xl font-bold">
            New Match
          </h1>

          <p className="text-gray-500">
            Create a new pickleball match.
          </p>
        </div>

        <MatchForm />

      </div>
    </DashboardLayout>
  );
}