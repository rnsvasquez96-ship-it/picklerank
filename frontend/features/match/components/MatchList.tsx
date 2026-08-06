"use client";

import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

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
  matches: Match[];
};

export default function MatchList({
  matches,
}: Props) {
  if (matches.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        No matches found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {match.player1.name}
              {" vs "}
              {match.player2.name}
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              {match.status}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <p>
              🏆 {match.tournament.name}
            </p>

            <p>
              Score:
              {" "}
              {match.player1Score}
              {" - "}
              {match.player2Score}
            </p>

            <p>
              Winner:
              {" "}
              {match.winner
                ? match.winner.name
                : "-"}
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <Link
              href={`/matches/${match.id}`}
              className="flex items-center gap-1 rounded border px-3 py-2 text-sm"
            >
              <Eye size={16} />
              View
            </Link>

            <Link
              href={`/matches/${match.id}/edit`}
              className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm text-white"
            >
              <Pencil size={16} />
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}