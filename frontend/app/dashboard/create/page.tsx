"use client";

import Link from "next/link";

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

        <h1 className="text-4xl font-bold mt-4">
          Create Tournament
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the information below.
        </p>
      </div>

    </div>
  );
}