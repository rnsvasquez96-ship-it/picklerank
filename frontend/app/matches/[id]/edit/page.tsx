import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchResultForm from "@/features/match/components/MatchResultForm";

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
      <div className="mx-auto max-w-xl space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Enter Match Result
          </h1>

          <p className="text-gray-500">
            Enter the final scores. The winner will be selected automatically,
            advanced to the next round, and the rankings will be updated.
          </p>
        </div>

        <MatchResultForm
          matchId={Number(id)}
        />
      </div>
    </DashboardLayout>
  );
}