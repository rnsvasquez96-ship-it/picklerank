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
      const searchTerm = search.toLowerCase();

      const searchMatch =
        tournament.name.toLowerCase().includes(searchTerm) ||
        tournament.location.toLowerCase().includes(searchTerm);

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
    <div className="space-y-6 sm:space-y-8">

      {/* Search & Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3">

          {/* Search */}
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tournament..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-3">

            {/* Status */}
            <div className="relative">
              <Filter
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm outline-none focus:border-green-500"
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredTournaments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center shadow-sm sm:py-20">

          <Trophy
            size={52}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-5 text-xl font-semibold text-gray-900">
            No tournaments found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

        </div>
      ) : (

        /* Tournament Cards */
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
            >

              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                    {tournament.name}
                  </h2>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {tournament.format}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${
                    tournament.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tournament.status}
                </span>

              </div>

              {/* Tournament Details */}
              <div className="mt-5 space-y-3">

                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <span className="break-words">
                    {tournament.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users
                    size={16}
                    className="shrink-0 text-green-600"
                  />

                  <span>
                    {tournament.maxPlayers} Players
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar
                    size={16}
                    className="shrink-0 text-green-600"
                  />

                  <span>
                    {new Date(
                      tournament.startDate
                    ).toLocaleDateString()}
                  </span>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2 sm:mt-8 sm:gap-3">

                <Link
                  href={`/tournaments/${tournament.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  <Eye size={17} />
                  View
                </Link>

                <Link
                  href={`/tournaments/${tournament.id}/edit`}
                  aria-label={`Edit ${tournament.name}`}
                  className="flex items-center justify-center rounded-xl border border-gray-200 px-4 transition hover:bg-gray-100"
                >
                  <Pencil size={17} />
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}