"use client";

import MatchCard from "./MatchCard";
import { BracketMatch } from "../types";

type Props = {
  round: number;
  totalRounds: number;
  matches: BracketMatch[];
};

function getRoundName(
  round: number,
  totalRounds: number,
) {
  const remaining =
    totalRounds - round + 1;

  switch (remaining) {
    case 1:
      return "Final";

    case 2:
      return "Semifinals";

    case 3:
      return "Quarterfinals";

    case 4:
      return "Round of 16";

    case 5:
      return "Round of 32";

    default:
      return `Round ${round}`;
  }
}

export default function RoundColumn({
  round,
  totalRounds,
  matches,
}: Props) {
  return (
    <div className="flex min-w-[320px] flex-col">
      <div className="mb-6 rounded-lg bg-gray-100 py-3 text-center shadow-sm">
        <h2 className="text-lg font-bold">
          {getRoundName(
            round,
            totalRounds,
          )}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {matches.length} Match
          {matches.length !== 1 ? "es" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
          />
        ))}
      </div>
    </div>
  );
}