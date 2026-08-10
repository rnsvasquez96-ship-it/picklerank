import DashboardLayout from "@/components/layout/DashboardLayout";
import RankingTable from "@/features/ranking/components/RankingTable";
import { getRankings } from "@/lib/ranking";
import { Medal } from "lucide-react";

export default async function RankingsPage() {
  const rankings = await getRankings();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center">

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100">
              <Medal
                size={32}
                className="text-yellow-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Player Rankings
              </h1>

              <p className="mt-1 text-gray-500">
                Live leaderboard based on completed matches and tournament performance.
              </p>
            </div>
          </div>

        </div>

        <RankingTable rankings={rankings} />

      </div>
    </DashboardLayout>
  );
}