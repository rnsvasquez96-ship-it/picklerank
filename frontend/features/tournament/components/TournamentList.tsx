"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Search,
  MapPin,
  Users,
  Calendar,
  Trophy,
  Filter,
} from "lucide-react";

type Tournament = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
  format: string;
};

type Props = {
  tournaments: Tournament[];
};

export default function TournamentList({
  tournaments,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const filteredTournaments = [...tournaments]
    .filter((tournament) => {
      const searchMatch =
        tournament.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        tournament.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =
        filter === "All" ||
        tournament.status === filter;

      return searchMatch && filterMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      return sort === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

  return (
    <div className="space-y-8">

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tournament..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:bg-white"
            />
          </div>

          <div className="flex gap-3">

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-8"
              >
                <option>All</option>
                <option>Upcoming</option>
                <option>Completed</option>
              </select>
            </div>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <option value="newest">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>
            </select>

          </div>

        </div>
      </div>

      {/* Empty */}
      {filteredTournaments.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center shadow-sm">
          <Trophy
            size={52}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-5 text-xl font-semibold">
            No tournaments found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {tournament.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {tournament.format}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    tournament.status ===
                    "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tournament.status}
                </span>

              </div>

              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin
                    size={16}
                    className="text-green-600"
                  />
                  {tournament.location}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users
                    size={16}
                    className="text-green-600"
                  />
                  {tournament.maxPlayers} Players
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar
                    size={16}
                    className="text-green-600"
                  />
                  {new Date(
                    tournament.startDate
                  ).toLocaleDateString()}
                </div>

              </div>

              <div className="mt-8 flex gap-3">

                <Link
                  href={`/tournaments/${tournament.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700"
                >
                  <Eye size={18} />
                  View
                </Link>

                <Link
                  href={`/tournaments/${tournament.id}/edit`}
                  className="flex items-center justify-center rounded-xl border border-gray-200 px-4 transition hover:bg-gray-100"
                >
                  <Pencil size={18} />
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}