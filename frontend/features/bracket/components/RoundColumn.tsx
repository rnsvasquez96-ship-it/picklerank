"use client";

import MatchCard from "./MatchCard";
import { BracketMatch } from "../types";

type Props = {
  title: string;
  matches: BracketMatch[];
};

export default function RoundColumn({
  title,
  matches,
}: Props) {
  return (
    <div className="flex min-w-[320px] flex-col">
      <div className="mb-6 rounded-lg bg-gray-100 py-3 text-center shadow-sm">
        <h2 className="text-lg font-bold">
          {title}
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