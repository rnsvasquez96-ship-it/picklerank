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
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:space-y-8 lg:px-8">

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-5 text-white shadow-lg sm:rounded-3xl sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

            {/* Hero Content */}
            <div className="flex items-start gap-4 sm:gap-5">

              <div className="shrink-0 rounded-xl bg-white/20 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <LayoutDashboard
                  size={28}
                  className="sm:h-[34px] sm:w-[34px]"
                />
              </div>

              <div className="min-w-0">

                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-green-100 sm:text-sm">
                  PickleRank Dashboard
                </p>

                <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
                  Welcome Back 👋
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-green-100 sm:text-base">
                  Monitor tournaments, players, rankings, and live
                  matches from one centralized dashboard.
                </p>

              </div>
            </div>

            {/* System Status */}
            <div className="w-full rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:rounded-2xl sm:p-6 lg:w-auto lg:min-w-[240px]">

              <div className="flex items-center gap-3">

                <Activity
                  size={20}
                  className="shrink-0 text-green-200"
                />

                <span className="text-sm font-semibold sm:text-base">
                  Live System Status
                </span>

              </div>

              <p className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
                Online
              </p>

              <p className="text-xs text-green-100 sm:text-sm">
                All services operating normally.
              </p>

            </div>

          </div>
        </div>

        {/* Statistics */}
        <section>
          <DashboardStats
            totalPlayers={dashboard.totalPlayers}
            totalTournaments={dashboard.totalTournaments}
            totalMatches={dashboard.totalMatches}
            completedMatches={dashboard.completedMatches}
          />
        </section>

        {/* Charts */}
        <section className="overflow-hidden">
          <DashboardCharts
            totalPlayers={dashboard.totalPlayers}
            totalTournaments={dashboard.totalTournaments}
            totalMatches={dashboard.totalMatches}
            completedMatches={dashboard.completedMatches}
          />
        </section>

        {/* Bottom Section */}
        <section className="grid gap-6 xl:grid-cols-2">

          <UpcomingTournament
            tournament={
              dashboard.upcomingTournament ?? null
            }
          />

          <RecentMatches
            matches={
              dashboard.recentMatches ?? []
            }
          />

        </section>

      </div>
    </DashboardLayout>
  );
}