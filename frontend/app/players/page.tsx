import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";

import { getPlayers } from "@/lib/player";
import PlayerList from "@/features/player/components/PlayerList";

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Players
            </h1>

            <p className="text-muted-foreground">
              Manage your players.
            </p>
          </div>

          <Link
            href="/players/new"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            + New Player
          </Link>
        </div>

        <PlayerList players={players} />
      </div>
    </DashboardLayout>
  );
}