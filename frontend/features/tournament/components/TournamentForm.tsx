"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  createTournament,
  getTournament,
  updateTournament,
} from "@/lib/tournament";

type TournamentFormProps = {
  tournamentId?: number;
};

export default function TournamentForm({
  tournamentId,
}: TournamentFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [loadingTournament, setLoadingTournament] =
    useState(tournamentId !== undefined);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    maxPlayers: 16,
    status: "Upcoming",
    format: "Single Elimination",
  });

  useEffect(() => {
    if (tournamentId === undefined) {
      setLoadingTournament(false);
      return;
    }

    async function loadTournament() {
      try {
        const tournament = await getTournament(
          tournamentId
        );

        setFormData({
          name: tournament.name,
          location: tournament.location,
          startDate:
            tournament.startDate.slice(0, 10),
          endDate:
            tournament.endDate.slice(0, 10),
          maxPlayers: tournament.maxPlayers,
          status: tournament.status,
          format: tournament.format,
        });
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load tournament."
        );
      } finally {
        setLoadingTournament(false);
      }
    }

    loadTournament();
  }, [tournamentId]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "maxPlayers"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        startDate: new Date(
          formData.startDate
        ).toISOString(),
        endDate: new Date(
          formData.endDate
        ).toISOString(),
      };

      if (tournamentId !== undefined) {
        await updateTournament(
          tournamentId,
          payload
        );

        alert(
          "Tournament updated successfully!"
        );
      } else {
        await createTournament(payload);

        alert(
          "Tournament created successfully!"
        );
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        tournamentId !== undefined
          ? "Failed to update tournament."
          : "Failed to create tournament."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingTournament) {
    return (
      <div className="rounded-lg border bg-white p-6">
        Loading tournament...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Tournament Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          placeholder="Enter tournament name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Location
        </label>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          placeholder="Enter location"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-md border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full rounded-md border p-3"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Maximum Players
        </label>

        <input
          type="number"
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
          min={2}
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Tournament Format
        </label>

        <select
          name="format"
          value={formData.format}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
        >
          <option value="Single Elimination">
            Single Elimination
          </option>

          <option value="Double Elimination">
            Double Elimination
          </option>

          <option value="Round Robin">
            Round Robin
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-md border p-3"
        >
          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Ongoing">
            Ongoing
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? tournamentId !== undefined
            ? "Saving..."
            : "Creating..."
          : tournamentId !== undefined
          ? "Save Changes"
          : "Create Tournament"}
      </Button>
    </form>
  );
}