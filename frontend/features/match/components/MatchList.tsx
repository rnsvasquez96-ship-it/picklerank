"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trophy,
  Swords,
  Medal,
  CircleDot,
} from "lucide-react";

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
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">
        <Swords
          size={52}
          className="mx-auto text-gray-300"
        />

        <h3 className="mt-5 text-xl font-semibold">
          No Matches Found
        </h3>

        <p className="mt-2 text-gray-500">
          Create your first match to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {match.player1.name}
              </h2>

              <p className="text-sm text-gray-500">
                vs
              </p>

              <h2 className="text-lg font-bold text-gray-900">
                {match.player2.name}
              </h2>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                match.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : match.status === "Ongoing"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {match.status}
            </span>
          </div>

          {/* Match Info */}
          <div className="mt-6 space-y-3 text-sm">

            <div className="flex items-center gap-3 text-gray-600">
              <Trophy
                size={16}
                className="text-blue-600"
              />
              {match.tournament.name}
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <CircleDot
                size={16}
                className="text-blue-600"
              />
              Score:
              <span className="font-semibold text-gray-900">
                {match.player1Score} - {match.player2Score}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Medal
                size={16}
                className="text-blue-600"
              />
              Winner:
              <span className="font-semibold text-gray-900">
                {match.winner
                  ? match.winner.name
                  : "-"}
              </span>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">

            <Link
              href={`/matches/${match.id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-medium transition hover:bg-gray-100"
            >
              <Eye size={18} />
              View
            </Link>

            <Link
              href={`/matches/${match.id}/edit`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              <Pencil size={18} />
              Edit
            </Link>

          </div>
        </div>
      ))}
    </div>
  );
}