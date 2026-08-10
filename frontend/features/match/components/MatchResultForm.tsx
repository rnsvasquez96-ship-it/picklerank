"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMatch, updateMatchResult } from "@/lib/match";

type Props = {
  matchId: number;
};

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

  player1Score: number;
  player2Score: number;
};

export default function MatchResultForm({
  matchId,
}: Props) {
  const router = useRouter();

  const [match, setMatch] =
    useState<Match | null>(null);

  const [player1Score, setPlayer1Score] =
    useState(0);

  const [player2Score, setPlayer2Score] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMatch(matchId);

        setMatch(data);

        setPlayer1Score(data.player1Score);

        setPlayer2Score(data.player2Score);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [matchId]);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateMatchResult(
        matchId,
        {
          player1Score,
          player2Score,
        },
      );

      alert(
        "Match updated successfully!"
      );

      router.push(
        `/tournaments/${match?.tournament.id}/bracket`,
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update result.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!match) {
    return <div>Match not found.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          {match.player1.name}
        </label>

        <input
          type="number"
          min={0}
          value={player1Score}
          onChange={(e) =>
            setPlayer1Score(
              Number(e.target.value),
            )
          }
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          {match.player2.name}
        </label>

        <input
          type="number"
          min={0}
          value={player2Score}
          onChange={(e) =>
            setPlayer2Score(
              Number(e.target.value),
            )
          }
          className="w-full rounded border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded bg-green-600 py-3 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : "Save Result"}
      </button>
    </form>
  );
}