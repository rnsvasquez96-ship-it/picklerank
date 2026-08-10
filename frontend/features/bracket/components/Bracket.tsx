"use client";

import RoundColumn from "./RoundColumn";
import { BracketMatch } from "../types";

type Props = {
  matches: BracketMatch[];
};

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
    <div className="flex gap-8 overflow-x-auto pb-6">
      {rounds.map((round) => (
        <RoundColumn
          key={round}
          round={round}
          matches={groupedMatches[round]}
        />
      ))}
    </div>
  );
}