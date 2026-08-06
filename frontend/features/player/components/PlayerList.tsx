"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Search,
} from "lucide-react";

type Player = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  skill?: string;
};

type Props = {
  players: Player[];
};

export default function PlayerList({
  players,
}: Props) {
  const [search, setSearch] =
    useState("");

  const filteredPlayers = players.filter(
    (player) =>
      player.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      player.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search players..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          No players found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map(
            (player) => (
              <div
                key={player.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold">
                  {player.name}
                </h2>

                <p className="mt-3 text-gray-600">
                  📧 {player.email}
                </p>

                <p className="mt-2 text-gray-600">
                  📞{" "}
                  {player.phone ||
                    "N/A"}
                </p>

                <p className="mt-2 text-gray-600">
                  🎯{" "}
                  {player.skill ||
                    "N/A"}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/players/${player.id}`}
                    className="flex items-center gap-1 rounded border px-3 py-2 text-sm"
                  >
                    <Eye size={16} />
                    View
                  </Link>

                  <Link
                    href={`/players/${player.id}/edit`}
                    className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm text-white"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}