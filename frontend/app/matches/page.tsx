import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import MatchList from "@/features/match/components/MatchList";

import { getMatches } from "@/lib/match";

export default async function MatchesPage() {
  const matches = await getMatches();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8 p-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Matches
            </h1>

            <p className="text-gray-500">
              Manage all pickleball matches.
            </p>
          </div>

          <Link
            href="/matches/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            + New Match
          </Link>

        </div>

        <MatchList
          matches={matches}
        />

      </div>
    </DashboardLayout>
  );
}