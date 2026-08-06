"use client";

import { useEffect, useState } from "react";
import {
  getRegistrations,
  registerPlayer,
  removeRegistration,
} from "@/lib/registration";
import { getPlayers } from "@/lib/player";

type Player = {
  id: number;
  name: string;
};

type Registration = {
  id: number;
  player: Player;
};

type Props = {
  tournamentId: number;
};

export default function RegistrationList({
  tournamentId,
}: Props) {
  const [registrations, setRegistrations] = useState<
    Registration[]
  >([]);

  const [players, setPlayers] = useState<Player[]>([]);

  const [selectedPlayer, setSelectedPlayer] =
    useState("");

  async function loadData() {
    const registrationData =
      await getRegistrations(tournamentId);

    const playerData =
      await getPlayers();

    setRegistrations(registrationData);
    setPlayers(playerData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleRegister() {
    if (!selectedPlayer) return;

    try {
      await registerPlayer({
        tournamentId,
        playerId: Number(selectedPlayer),
      });

      setSelectedPlayer("");

      loadData();
    } catch (error) {
      console.error(error);

      alert("Failed to register player.");
    }
  }

  async function handleRemove(id: number) {
    if (!confirm("Remove player?")) return;

    await removeRegistration(id);

    loadData();
  }

return (
  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold">
      Registered Players
    </h2>

    <p className="mb-6 text-gray-500">
      {registrations.length} Registered Player
      {registrations.length !== 1 ? "s" : ""}
    </p>

    <div className="mb-6 flex gap-3">

        <select
          value={selectedPlayer}
          onChange={(e) =>
            setSelectedPlayer(e.target.value)
          }
          className="flex-1 rounded-md border p-3"
        >
          <option value="">
            Select Player
          </option>

{players
  .filter(
    (player) =>
      !registrations.some(
        (registration) =>
          registration.player.id === player.id
      )
  )
  .map((player) => (
    <option
      key={player.id}
      value={player.id}
    >
      {player.name}
    </option>
  ))}
        </select>

        <button
          onClick={handleRegister}
          className="rounded bg-blue-600 px-5 text-white"
        >
          Register
        </button>

      </div>

      <div className="space-y-3">

        {registrations.map((registration) => (

          <div
            key={registration.id}
            className="flex items-center justify-between rounded border p-3"
          >

            <span>
              👤 {registration.player.name}
            </span>

            <button
              onClick={() =>
                handleRemove(registration.id)
              }
              className="rounded bg-red-600 px-3 py-1 text-white"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}