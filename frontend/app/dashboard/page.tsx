import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardStats from "@/features/dashboard/components/DashboardStats";
import DashboardCharts from "@/features/dashboard/components/DashboardCharts";
import UpcomingTournament from "@/features/dashboard/components/UpcomingTournament";
import RecentMatches from "@/features/dashboard/components/RecentMatches";

import { getDashboard } from "@/lib/dashboard";

import {
  LayoutDashboard,
  Activity,
} from "lucide-react";

export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Hero */}
        <div className="rounded-3xl border border-green-100 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-lg">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
                <LayoutDashboard size={34} />
              </div>

              <div>

                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-100">
                  PickleRank Dashboard
                </p>

                <h1 className="text-4xl font-bold">
                  Welcome Back 👋
                </h1>

                <p className="mt-3 max-w-2xl text-green-100">
                  Monitor tournaments, players, rankings, and live
                  matches from one centralized dashboard.
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">

              <div className="flex items-center gap-3">
                <Activity
                  size={22}
                  className="text-green-200"
                />

                <span className="font-semibold">
                  Live System Status
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold">
                Online
              </p>

              <p className="text-sm text-green-100">
                All services operating normally.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}
        <DashboardStats
          totalPlayers={dashboard.totalPlayers}
          totalTournaments={dashboard.totalTournaments}
          totalMatches={dashboard.totalMatches}
          completedMatches={dashboard.completedMatches}
        />

        {/* Charts */}
        <DashboardCharts
          totalPlayers={dashboard.totalPlayers}
          totalTournaments={dashboard.totalTournaments}
          totalMatches={dashboard.totalMatches}
          completedMatches={dashboard.completedMatches}
        />

        {/* Bottom Section */}
        <div className="grid gap-6 xl:grid-cols-2">

          <UpcomingTournament
            tournament={
              dashboard.upcomingTournament ??
              null
            }
          />

          <RecentMatches
            matches={
              dashboard.recentMatches ??
              []
            }
          />

        </div>

      </div>
    </DashboardLayout>
  );
}