"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Search } from "lucide-react";

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

      const dateA =
        new Date(a.startDate).getTime();

      const dateB =
        new Date(b.startDate).getTime();


      return sort === "newest"
        ? dateB - dateA
        : dateA - dateB;

    });



  return (
    <div className="space-y-6">


      <div className="flex flex-col gap-4 md:flex-row">


        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search tournaments..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>



        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >

          <option value="All">
            All
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>



        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

        </select>


      </div>



      {
        filteredTournaments.length === 0 ? (

          <div className="rounded-lg border p-8 text-center">
            No tournaments found.
          </div>

        ) : (


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


            {
              filteredTournaments.map((tournament) => (

                <div
                  key={tournament.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >


                  <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                      {tournament.name}
                    </h2>


                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {tournament.status}
                    </span>

                  </div>



                <div className="mt-4 space-y-2">
                 <p>
                📍 {tournament.location}
                 </p>

                <p>
                 👥 {tournament.maxPlayers} Players
                 </p>

                <p>
                 🏆 {tournament.format}
                 </p>

                <p>
                 📅{" "}
                {new Date(
                      tournament.startDate
                     ).toLocaleDateString()}
                 </p>
                </div>



<div className="mt-5 flex flex-wrap gap-2">

  <Link
    href={`/tournaments/${tournament.id}`}
    className="flex items-center gap-1 rounded border px-3 py-2 text-sm"
  >
    <Eye size={16} />
    View
  </Link>

  <Link
    href={`/tournaments/${tournament.id}/edit`}
    className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm text-white"
  >
    <Pencil size={16} />
    Edit
  </Link>

  <Link
    href={`/tournaments/${tournament.id}/bracket`}
    className="rounded bg-purple-600 px-3 py-2 text-sm text-white"
  >
    🏆 Bracket
  </Link>

</div>


                </div>

              ))
            }


          </div>

        )
      }


    </div>
  );
}