import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchDetails from "@/features/match/components/MatchDetails";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MatchPage({
  params,
}: Props) {
  const { id } = await params;

  const matchId = Number(id);

  if (Number.isNaN(matchId)) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl p-8">
        <MatchDetails matchId={matchId} />
      </div>
    </DashboardLayout>
  );
}