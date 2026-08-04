"use client";

import { Button } from "@/components/ui/button";

export default function TournamentForm() {
  return (
    <form className="space-y-6 rounded-lg border bg-white p-6">

      <div>
        <label className="mb-2 block font-medium">
          Tournament Name
        </label>

        <input
          className="w-full rounded-md border p-3"
          placeholder="Enter tournament name"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Location
        </label>

        <input
          className="w-full rounded-md border p-3"
          placeholder="Enter location"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            type="date"
            className="w-full rounded-md border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Date
          </label>

          <input
            type="date"
            className="w-full rounded-md border p-3"
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block font-medium">
          Maximum Players
        </label>

        <input
          type="number"
          className="w-full rounded-md border p-3"
          placeholder="64"
        />
      </div>

      <Button type="submit">
        Create Tournament
      </Button>

    </form>
  );
}