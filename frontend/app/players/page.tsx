import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Users, Plus } from "lucide-react";

import { getPlayers } from "@/lib/player";
import PlayerList from "@/features/player/components/PlayerList";

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <Users
                size={30}
                className="text-violet-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Players
              </h1>

              <p className="mt-1 text-gray-500">
                Manage registered players, update profiles, and monitor participation.
              </p>
            </div>

          </div>

          <Link
            href="/players/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-violet-700"
          >
            <Plus size={18} />
            New Player
          </Link>

        </div>

        <PlayerList players={players} />

      </div>
    </DashboardLayout>
  );
}