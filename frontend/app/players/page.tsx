import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Users, Plus } from "lucide-react";

import { getPlayers } from "@/lib/player";
import PlayerList from "@/features/player/components/PlayerList";

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:space-y-8 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">

          {/* Title */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Users
                size={26}
                className="text-violet-600 sm:h-[30px] sm:w-[30px]"
              />
            </div>

            <div className="min-w-0">

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Players
              </h1>

              <p className="mt-1 text-sm leading-5 text-gray-500 sm:text-base">
                Manage registered players, update profiles, and monitor
                participation.
              </p>

            </div>
          </div>

          {/* New Player */}
          <Link
            href="/players/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-violet-700 sm:w-auto"
          >
            <Plus size={18} />
            New Player
          </Link>

        </div>

        {/* Player List */}
        <section className="min-w-0">
          <PlayerList players={players} />
        </section>

      </div>
    </DashboardLayout>
  );
}