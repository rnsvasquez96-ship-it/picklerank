"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  createMatch,
  getMatch,
  updateMatch,
  getTournamentOptions,
  getPlayerOptions,
} from "@/lib/match";

type Tournament = {
  id: number;
  name: string;
};

type Player = {
  id: number;
  name: string;
};

type Props = {
  matchId?: number;
};

export default function MatchForm({
  matchId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);

  const [formData, setFormData] = useState({
    tournamentId: 0,
    player1Id: 0,
    player2Id: 0,
    player1Score: 0,
    player2Score: 0,
    winnerId: 0,
    status: "Scheduled",
  });

  useEffect(() => {
    async function loadData() {
      const tournamentData = await getTournamentOptions();
      const playerData = await getPlayerOptions();

      setTournaments(tournamentData);
      setPlayers(playerData);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (matchId === undefined) return;

    async function loadMatch() {
      try {
        const match = await getMatch(matchId!);

        setFormData({
          tournamentId: match.tournamentId,
          player1Id: match.player1Id,
          player2Id: match.player2Id,
          player1Score: match.player1Score,
          player2Score: match.player2Score,
          winnerId: match.winnerId ?? 0,
          status: match.status,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load match.");
      }
    }

    loadMatch();
  }, [matchId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("Score") || name.includes("Id")
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.player1Id === formData.player2Id) {
      alert("Player 1 and Player 2 cannot be the same.");
      return;
    }

    setLoading(true);

    try {
      let winnerId = 0;

      if (formData.player1Score > formData.player2Score) {
        winnerId = formData.player1Id;
      } else if (
        formData.player2Score > formData.player1Score
      ) {
        winnerId = formData.player2Id;
      }

      const data = {
        ...formData,
        winnerId,
      };

      if (matchId !== undefined) {
        await updateMatch(matchId!, data);

        alert("Match updated.");
      } else {
        await createMatch(data);

        alert("Match created.");
      }

      router.push("/matches");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to save match.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Tournament
        </label>

        <select
          name="tournamentId"
          value={formData.tournamentId}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value={0}>Select Tournament</option>

          {tournaments.map((tournament) => (
            <option
              key={tournament.id}
              value={tournament.id}
            >
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Player 1
        </label>

        <select
          name="player1Id"
          value={formData.player1Id}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value={0}>Select Player</option>

          {players.map((player) => (
            <option
              key={player.id}
              value={player.id}
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Player 2
        </label>

        <select
          name="player2Id"
          value={formData.player2Id}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value={0}>Select Player</option>

          {players.map((player) => (
            <option
              key={player.id}
              value={player.id}
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-medium">
            Player 1 Score
          </label>

          <input
            type="number"
            name="player1Score"
            value={formData.player1Score}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Player 2 Score
          </label>

          <input
            type="number"
            name="player2Score"
            value={formData.player2Score}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : matchId
          ? "Save Changes"
          : "Create Match"}
      </Button>
    </form>
  );
}