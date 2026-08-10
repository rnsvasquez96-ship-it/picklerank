"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Trophy,
  Swords,
  TrendingUp,
  Percent,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getPlayer,
  deletePlayer,
} from "@/lib/player";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type MatchHistory = {
  id: number;
  opponent: string;
  result: "Win" | "Loss";
  score: string;
};

type Player = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  skill?: string;

  stats?: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
  };

  history?: MatchHistory[];
};

type Props = {
  playerId: number;
};

export default function PlayerDetails({
  playerId,
}: Props) {
  const router = useRouter();

  const [player, setPlayer] =
    useState<Player | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    async function loadPlayer() {
      try {
        const data =
          await getPlayer(playerId);

        setPlayer(data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load player."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [playerId]);

  async function handleDelete() {
    try {
      setDeleting(true);

      await deletePlayer(playerId);

      toast.success(
        "Player deleted successfully!"
      );

      router.push("/players");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete player."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Loading player...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Player not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {player.name}
            </h2>

            <p className="mt-1 text-muted-foreground">
              Player Information
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/players"
              className="flex items-center gap-2 rounded border px-4 py-2"
            >
              <ArrowLeft size={18} />
              Back
            </Link>

            <Link
              href={`/players/${player.id}/edit`}
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              <Pencil size={18} />
              Edit
            </Link>

            <AlertDialog>

  <AlertDialogTrigger
    className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
  >
    <Trash2 size={18} />
    Delete
  </AlertDialogTrigger>

  <AlertDialogContent>

    <AlertDialogHeader>

      <AlertDialogTitle>
        Delete Player?
      </AlertDialogTitle>

      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>

    </AlertDialogHeader>

    <AlertDialogFooter>

      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={handleDelete}
        disabled={deleting}
        className="bg-red-600 hover:bg-red-700"
      >
        {deleting ? "Deleting..." : "Delete"}
      </AlertDialogAction>

    </AlertDialogFooter>

  </AlertDialogContent>

</AlertDialog>

          </div>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {player.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium">
              {player.phone || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Skill Rating
            </p>

            <p className="font-medium">
              {player.skill || "-"}
            </p>
          </div>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <StatCard
          title="Matches"
          value={
            player.stats?.matchesPlayed ??
            0
          }
          icon={<Swords size={20} />}
        />

        <StatCard
          title="Wins"
          value={
            player.stats?.wins ?? 0
          }
          icon={<Trophy size={20} />}
        />

        <StatCard
          title="Losses"
          value={
            player.stats?.losses ?? 0
          }
          icon={<TrendingUp size={20} />}
        />

        <StatCard
          title="Win Rate"
          value={`${player.stats?.winRate ?? 0}%`}
          icon={<Percent size={20} />}
        />

      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="mb-6 text-xl font-bold">
          Match History
        </h3>

        {player.history &&
        player.history.length > 0 ? (

          <div className="space-y-4">

            {player.history.map(
              (match) => (

                <div
                  key={match.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-semibold">
                      vs {match.opponent}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {match.score}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      match.result ===
                      "Win"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {match.result}
                  </span>

                </div>

              ),
            )}

          </div>

        ) : (

          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            No matches played yet.
          </div>

        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-3xl font-bold">
          {value}
        </span>
      </div>

      <p className="mt-4 text-muted-foreground">
        {title}
      </p>
    </div>
  );
}