import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Plus, Trophy } from "lucide-react";

import { getTournaments } from "@/lib/tournament";
import TournamentList from "@/features/tournament/components/TournamentList";

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center">

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <Trophy
                size={32}
                className="text-green-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tournaments
              </h1>

              <p className="mt-1 text-gray-500">
                Create, organize, and manage your pickleball tournaments.
              </p>
            </div>
          </div>

          <Link
            href="/tournaments/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
          >
            <Plus size={18} />
            New Tournament
          </Link>

        </div>

        {/* Tournament List */}
        <TournamentList tournaments={tournaments} />

      </div>
    </DashboardLayout>
  );
}