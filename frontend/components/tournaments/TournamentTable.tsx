"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import {
  getTournaments,
  deleteTournament,
} from "@/lib/tournament";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Tournament } from "@/features/tournament/types";

export default function TournamentTable() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

useEffect(() => {
  async function loadTournaments() {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Failed to load tournaments:", error);
    }
  }

  loadTournaments();
}, []);

async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this tournament?"
  );

  if (!confirmed) return;

  try {
    await deleteTournament(id);

    setTournaments((prev) =>
      prev.filter((tournament) => tournament.id !== id)
    );

    alert("Tournament deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete tournament.");
  }
}

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tournaments</CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Tournament</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>Players</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-500"
                >
                  No tournaments found.
                </td>
              </tr>
            ) : (
              tournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 font-medium">
                    {tournament.name}
                  </td>

                  <td>{tournament.location}</td>

                  <td>
                    {new Date(
                      tournament.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td>{tournament.maxPlayers}</td>

                  <td>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {tournament.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tournaments/${tournament.id}`}
                        className="rounded p-2 hover:bg-gray-100"
                        title="View Tournament"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/tournaments/${tournament.id}/edit`}
                        className="rounded p-2 hover:bg-blue-100"
                        title="Edit Tournament"
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <button
                        onClick={() => handleDelete(tournament.id)}
                        className="rounded p-2 hover:bg-red-100"
                        title="Delete Tournament"       
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}