"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skill: "",
  });

  useEffect(() => {
    if (playerId === undefined) return;

    async function loadPlayer() {
      try {
        const player = await getPlayer(playerId);

        setFormData({
          name: player.name,
          email: player.email,
          phone: player.phone ?? "",
          skill: player.skill ?? "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load player.");
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

        alert("Player updated successfully!");
      } else {
        await createPlayer(formData);

        alert("Player created successfully!");
      }

      router.push("/players");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        playerId
          ? "Failed to update player."
          : "Failed to create player."
      );
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

          <option value="1.0">
            1.0 - Beginner
          </option>

          <option value="1.5">
            1.5 - Beginner
          </option>

          <option value="2.0">
            2.0 - Novice
          </option>

          <option value="2.5">
            2.5 - Novice
          </option>

          <option value="3.0">
            3.0 - Intermediate
          </option>

          <option value="3.5">
            3.5 - Intermediate
          </option>

          <option value="4.0">
            4.0 - Advanced
          </option>

          <option value="4.5">
            4.5 - Advanced
          </option>

          <option value="5.0">
            5.0 - Expert
          </option>

          <option value="5.5+">
            5.5+ - Professional
          </option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? playerId
            ? "Saving..."
            : "Creating..."
          : playerId
            ? "Save Changes"
            : "Create Player"}
      </Button>
    </form>
  );
}