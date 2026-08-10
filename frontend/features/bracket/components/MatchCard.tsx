"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { BracketMatch } from "../types";

type Props = {
  match: BracketMatch;
};

export default function MatchCard({
  match,
}: Props) {
  const winnerId = match.winner?.id;

  return (
    <div className="relative">
      <Link href={`/matches/${match.id}`}>
        <div className="cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-500">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
            <h3 className="font-semibold">
              Match #{match.id}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                match.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : match.status === "Scheduled"
                  ? "bg-blue-100 text-blue-700"
                  : match.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {match.status}
            </span>
          </div>

          <div className="space-y-3 p-4">
            <div
              className={`flex items-center justify-between rounded-lg border p-3 transition ${
                winnerId === match.player1?.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {winnerId === match.player1?.id && (
                  <Trophy
                    size={16}
                    className="text-yellow-500"
                  />
                )}

                <span className="font-medium">
                  {match.player1?.name ?? "TBD"}
                </span>
              </div>

              <strong className="text-lg">
                {match.player1Score}
              </strong>
            </div>

            <div
              className={`flex items-center justify-between rounded-lg border p-3 transition ${
                winnerId === match.player2?.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {winnerId === match.player2?.id && (
                  <Trophy
                    size={16}
                    className="text-yellow-500"
                  />
                )}

                <span className="font-medium">
                  {match.player2?.name ?? "TBD"}
                </span>
              </div>

              <strong className="text-lg">
                {match.player2Score}
              </strong>
            </div>

            {match.winner && (
              <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3 text-green-700">
                <Trophy size={18} />

                <span>
                  Winner:
                  <strong className="ml-1">
                    {match.winner.name}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Bracket connector */}
      <div className="absolute right-[-48px] top-1/2 hidden h-[2px] w-12 -translate-y-1/2 bg-gray-400 lg:block" />
    </div>
  );
}