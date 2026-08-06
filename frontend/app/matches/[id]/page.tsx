import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchDetails from "@/features/match/components/MatchDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MatchPage({
  params,
}: Props) {

  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl p-8">

        <MatchDetails
          matchId={Number(id)}
        />

      </div>
    </DashboardLayout>
  );
}