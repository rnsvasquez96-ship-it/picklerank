"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getPlayer,
  deletePlayer,
} from "@/lib/player";

type Player = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  skill?: string;
};

type Props = {
  playerId: number;
};

export default function PlayerDetails({
  playerId,
}: Props) {
  const router = useRouter();

  const [player, setPlayer] =
    useState<Player | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPlayer() {
      try {
        const data =
          await getPlayer(playerId);

        setPlayer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [playerId]);

  async function handleDelete() {
    if (
      !confirm(
        "Delete this player?"
      )
    ) {
      return;
    }

    try {
      await deletePlayer(playerId);

      alert(
        "Player deleted successfully."
      );

      router.push("/players");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete player."
      );
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border p-6">
        Loading player...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="rounded-lg border p-6">
        Player not found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {player.name}
        </h1>

        <p className="text-gray-500">
          Player Information
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Email
        </p>

        <p className="font-medium">
          {player.email}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Phone
        </p>

        <p className="font-medium">
          {player.phone || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Skill
        </p>

        <p className="font-medium">
          {player.skill || "-"}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/players"
          className="flex items-center gap-2 rounded border px-4 py-2"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link
          href={`/players/${player.id}/edit`}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
        >
          <Pencil size={18} />
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}