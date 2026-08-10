import Link from "next/link";
import { Plus, Swords } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import MatchList from "@/features/match/components/MatchList";

import { getMatches } from "@/lib/match";

export default async function MatchesPage() {
  const matches = await getMatches();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Swords
                size={30}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Matches
              </h1>

              <p className="mt-1 text-gray-500">
                Manage pickleball matches, record scores, and monitor match progress.
              </p>
            </div>

          </div>

          <Link
            href="/matches/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Match
          </Link>

        </div>

        <MatchList matches={matches} />

      </div>
    </DashboardLayout>
  );
}