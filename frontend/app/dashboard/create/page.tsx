"use client";

import Link from "next/link";
import TournamentForm from "@/features/tournament/components/TournamentForm";

export default function CreateTournamentPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-green-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          Create Tournament
        </h1>

        <p className="mt-2 text-gray-500">
          Fill in the information below.
        </p>
      </div>

      <TournamentForm />
    </div>
  );
}