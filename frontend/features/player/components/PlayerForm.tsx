"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  createPlayer,
  getPlayer,
  updatePlayer,
} from "@/lib/player";

type PlayerFormProps = {
  playerId?: number;
};

export default function PlayerForm({
  playerId,
}: PlayerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(
    playerId !== undefined
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skill: "",
  });

  useEffect(() => {
  if (playerId === undefined) {
    setLoadingPlayer(false);
    return;
  }

  const id = playerId;

  async function loadPlayer() {
    try {
      const player = await getPlayer(id);

      setFormData({
        name: player.name,
        email: player.email,
        phone: player.phone ?? "",
        skill: player.skill ?? "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load player.");
    } finally {
      setLoadingPlayer(false);
    }
  }

  loadPlayer();
}, [playerId]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (playerId !== undefined) {
        await updatePlayer(playerId, formData);

        toast.success(
          "Player updated successfully!"
        );
      } else {
        await createPlayer(formData);

        toast.success(
          "Player added successfully!"
        );
      }

      router.push("/players");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to save player.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingPlayer) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading player...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Player Name
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          placeholder="Enter player name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          placeholder="Enter email"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Phone
        </label>

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Skill Level
        </label>

        <select
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
        >
          <option value="">
            Select Skill Level
          </option>

          <option value="1.0">1.0 - Beginner</option>
          <option value="1.5">1.5 - Beginner</option>
          <option value="2.0">2.0 - Novice</option>
          <option value="2.5">2.5 - Novice</option>
          <option value="3.0">3.0 - Intermediate</option>
          <option value="3.5">3.5 - Intermediate</option>
          <option value="4.0">4.0 - Advanced</option>
          <option value="4.5">4.5 - Advanced</option>
          <option value="5.0">5.0 - Expert</option>
          <option value="5.5+">
            5.5+ - Professional
          </option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {playerId
              ? "Saving..."
              : "Creating..."}
          </>
        ) : playerId ? (
          "Save Changes"
        ) : (
          "Create Player"
        )}
      </Button>
    </form>
  );
}