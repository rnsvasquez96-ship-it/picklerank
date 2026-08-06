import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchForm from "@/features/match/components/MatchForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMatchPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6 p-8">

        <div>
          <h1 className="text-3xl font-bold">
            Edit Match
          </h1>

          <p className="text-gray-500">
            Update match information.
          </p>
        </div>

        <MatchForm
          matchId={Number(id)}
        />

      </div>
    </DashboardLayout>
  );
}