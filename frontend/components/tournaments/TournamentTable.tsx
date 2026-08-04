"use client";

import { useEffect, useState } from "react";
import { getTournaments } from "@/lib/tournament";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Tournament = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
};

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
              <th>Players</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No tournaments found.
                </td>
              </tr>
            ) : (
              tournaments.map((tournament) => (
                <tr key={tournament.id} className="border-b">
                  <td className="py-4">{tournament.name}</td>
                  <td>{tournament.location}</td>
                  <td>{tournament.maxPlayers}</td>
                  <td>{tournament.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}