import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Plus, Trophy } from "lucide-react";

import { getTournaments } from "@/lib/tournament";
import TournamentList from "@/features/tournament/components/TournamentList";

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:space-y-8 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">

          {/* Title */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Trophy
                size={26}
                className="text-green-600 sm:h-8 sm:w-8"
              />
            </div>

            <div className="min-w-0">

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Tournaments
              </h1>

              <p className="mt-1 text-sm leading-5 text-gray-500 sm:text-base">
                Create, organize, and manage your pickleball tournaments.
              </p>

            </div>
          </div>

          {/* New Tournament */}
          <Link
            href="/tournaments/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg sm:w-auto"
          >
            <Plus size={18} />
            New Tournament
          </Link>

        </div>

        {/* Tournament List */}
        <section className="min-w-0">
          <TournamentList tournaments={tournaments} />
        </section>

      </div>
    </DashboardLayout>
  );
}