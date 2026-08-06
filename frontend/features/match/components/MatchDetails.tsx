"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getMatch,
  deleteMatch,
} from "@/lib/match";

type Match = {
  id: number;

  tournament: {
    name: string;
  };

  player1: {
    name: string;
  };

  player2: {
    name: string;
  };

  winner?: {
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

  useEffect(() => {

    async function loadMatch() {

      try {

        const data =
          await getMatch(matchId);

        setMatch(data);

      } finally {

        setLoading(false);

      }

    }

    loadMatch();

  }, [matchId]);

  async function handleDelete() {

    if (
      !confirm("Delete this match?")
    ) return;

    await deleteMatch(matchId);

    router.push("/matches");

    router.refresh();

  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!match) {
    return <div>Match not found.</div>;
  }

  return (

    <div className="space-y-6 rounded-lg border bg-white p-6">

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

        <p>
          <strong>Players:</strong>{" "}
          {match.player1.name}
          {" vs "}
          {match.player2.name}
        </p>

        <p>
          <strong>Score:</strong>{" "}
          {match.player1Score}
          {" - "}
          {match.player2Score}
        </p>

        <p>
          <strong>Winner:</strong>{" "}
          {match.winner
            ? match.winner.name
            : "-"}
        </p>

      </div>

      <div className="flex gap-3">

        <Link
          href="/matches"
          className="flex items-center gap-2 rounded border px-4 py-2"
        >
          <ArrowLeft size={18}/>
          Back
        </Link>

        <Link
          href={`/matches/${match.id}/edit`}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
        >
          <Pencil size={18}/>
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white"
        >
          <Trash2 size={18}/>
          Delete
        </button>

      </div>

    </div>

  );

}