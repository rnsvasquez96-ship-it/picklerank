"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getRegistrations,
  registerPlayer,
  removeRegistration,
} from "@/lib/registration";

import { getPlayers } from "@/lib/player";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  async function loadData() {
    try {
      const registrationData = await getRegistrations(tournamentId);
      const playerData = await getPlayers();

      setRegistrations(registrationData);
      setPlayers(playerData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load registrations.");
    }
  }

  useEffect(() => {
    loadData();
  }, [tournamentId]);

  async function handleRegister() {
    if (!selectedPlayer) return;

    try {
      await registerPlayer({
        tournamentId,
        playerId: Number(selectedPlayer),
      });

      toast.success("Player registered successfully!");
      setSelectedPlayer("");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to register player.");
    }
  }

  async function handleRemove(id: number) {
    try {
      await removeRegistration(id);

      toast.success("Player removed successfully.");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove player.");
    }
  }

  return (
    <div className="mt-10">
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
          onChange={(e) => setSelectedPlayer(e.target.value)}
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
          className="rounded bg-blue-600 px-5 text-white hover:bg-blue-700"
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

            <AlertDialog>
              <AlertDialogTrigger className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
    Remove
</AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Remove Player?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This player will be removed from the
                    tournament registration.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() =>
                      handleRemove(registration.id)
                    }
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}