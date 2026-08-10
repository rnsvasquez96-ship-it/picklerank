"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Search,
  Mail,
  Phone,
  Target,
  UserRound,
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
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter(
    (player) =>
      player.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      player.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search players..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Empty */}
      {filteredPlayers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">

          <UserRound
            size={52}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Players Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try searching with another keyword.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Avatar */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                  <UserRound
                    size={28}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {player.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Registered Player
                  </p>
                </div>

              </div>

              {/* Info */}
              <div className="mt-6 space-y-3 text-sm">

                <div className="flex items-center gap-3 text-gray-600">
                  <Mail
                    size={16}
                    className="text-violet-500"
                  />
                  {player.email}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Phone
                    size={16}
                    className="text-violet-500"
                  />
                  {player.phone || "Not Available"}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Target
                    size={16}
                    className="text-violet-500"
                  />
                  {player.skill || "Not Set"}
                </div>

              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-3">

                <Link
                  href={`/players/${player.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-medium transition hover:bg-gray-100"
                >
                  <Eye size={18} />
                  View
                </Link>

                <Link
                  href={`/players/${player.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 font-medium text-white transition hover:bg-violet-700"
                >
                  <Pencil size={18} />
                  Edit
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}