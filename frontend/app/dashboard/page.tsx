import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardStats from "@/features/dashboard/components/DashboardStats";
import UpcomingTournament from "@/features/dashboard/components/UpcomingTournament";
import RecentMatches from "@/features/dashboard/components/RecentMatches";

import { getDashboard } from "@/lib/dashboard";

export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Welcome to PickleRank Tournament Management System.
          </p>
        </div>

        <DashboardStats
          totalPlayers={dashboard.totalPlayers}
          totalTournaments={dashboard.totalTournaments}
          totalMatches={dashboard.totalMatches}
          completedMatches={dashboard.completedMatches}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <UpcomingTournament
            tournament={dashboard.upcomingTournament}
          />

          <RecentMatches
            matches={dashboard.recentMatches}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}