"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getMatch,
  deleteMatch,
  updateMatchResult,
} from "@/lib/match";

type Match = {
  id: number;

  tournament: {
    id: number;
    name: string;
  };

  player1: {
    id: number;
    name: string;
  };

  player2: {
    id: number;
    name: string;
  };

  winner?: {
    id: number;
    name: string;
  } | null;

  player1Score: number;
  player2Score: number;

  status: string;
};

type Props = {
  matchId: number;
};

export default function MatchDetails({
  matchId,
}: Props) {
  const router = useRouter();

  const [match, setMatch] =
    useState<Match | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [player1Score, setPlayer1Score] =
    useState(0);

  const [player2Score, setPlayer2Score] =
    useState(0);

  useEffect(() => {
    async function loadMatch() {
      try {
        const data = await getMatch(matchId);

        setMatch(data);

        setPlayer1Score(
          data.player1Score ?? 0,
        );

        setPlayer2Score(
          data.player2Score ?? 0,
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to load match.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMatch();
  }, [matchId]);

  async function handleSave() {
    if (!match) return;

    if (
      player1Score === player2Score
    ) {
      toast.error(
        "Scores cannot be tied."
      );
      return;
    }

    try {
      setSaving(true);

      const updated =
        await updateMatchResult(
          matchId,
          {
            player1Score,
            player2Score,
          },
        );

      setMatch(updated);

      toast.success(
        "Match result updated!"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update match."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this match?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteMatch(matchId);

      toast.success(
        "Match deleted."
      );

      router.push("/matches");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete match."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Loading match...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Match not found.
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-xl border bg-white p-8 shadow-sm">

      <div>
        <h1 className="text-3xl font-bold">
          Match #{match.id}
        </h1>

        <p className="text-gray-500">
          {match.status}
        </p>
      </div>

      <div>
        <p>
          <strong>Tournament:</strong>{" "}
          {match.tournament.name}
        </p>
      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            {match.player1.name}
          </label>

          <input
            type="number"
            min={0}
            disabled={
              match.status ===
              "Completed"
            }
            value={player1Score}
            onChange={(e) =>
              setPlayer1Score(
                Number(
                  e.target.value,
                ),
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            {match.player2.name}
          </label>

          <input
            type="number"
            min={0}
            disabled={
              match.status ===
              "Completed"
            }
            value={player2Score}
            onChange={(e) =>
              setPlayer2Score(
                Number(
                  e.target.value,
                ),
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={
            saving ||
            match.status ===
              "Completed"
          }
          className="rounded bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Result"}
        </button>

      </div>

      <div>
        <p>
          <strong>Winner:</strong>{" "}
          {match.winner
            ? match.winner.name
            : "-"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">

        <Link
          href="/matches"
          className="flex items-center gap-2 rounded border px-4 py-2"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link
          href={`/matches/${match.id}/edit`}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          <Trash2 size={18} />

          {deleting
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>

    </div>
  );
}