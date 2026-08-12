"use client";

import RoundColumn from "./RoundColumn";
import { BracketMatch } from "../types";

type Props = {
    title: string;
    matches: BracketMatch[];
}

export default function Bracket({
  matches,
}: Props) {
  const groupedMatches = matches.reduce(
    (acc, match) => {
      if (!acc[match.round]) {
        acc[match.round] = [];
      }

      acc[match.round].push(match);

      return acc;
    },
    {} as Record<number, BracketMatch[]>,
  );

  const rounds = Object.keys(groupedMatches)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-8 pb-6">
        {rounds.map((round) => (
          <RoundColumn
            key={round}
            title={`Round ${round}`}
            matches={groupedMatches[round]}
          />
        ))}
      </div>
    </div>
  );
}