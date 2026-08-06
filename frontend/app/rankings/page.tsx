import DashboardLayout from "@/components/layout/DashboardLayout";
import RankingTable from "@/features/ranking/components/RankingTable";
import { getRankings } from "@/lib/ranking";

export default async function RankingsPage() {
  const rankings = await getRankings();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8 p-8">

        <div>
          <h1 className="text-3xl font-bold">
            Player Rankings
          </h1>

          <p className="text-gray-500">
            Live leaderboard based on completed matches.
          </p>
        </div>

        <RankingTable rankings={rankings} />

      </div>
    </DashboardLayout>
  );
}