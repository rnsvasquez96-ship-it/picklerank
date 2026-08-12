"use client";

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

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { generateBracket } from "@/lib/bracket";
import {
  getTournament,
  deleteTournament,
} from "@/lib/tournament";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";

type Tournament = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
  format: string;

  champion?: {
    id: number;
    name: string;
  } | null;
};

type TournamentDetailsProps = {
  tournamentId: number;
};

export default function TournamentDetails({
  tournamentId,
}: TournamentDetailsProps) {
  const router = useRouter();

  const [tournament, setTournament] =
    useState<Tournament | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);

  useEffect(() => {
    async function loadTournament() {
      try {
        const data =
          await getTournament(
            tournamentId
          );

        setTournament(data);
      } catch (error) {
        console.error(
          "Failed to load tournament:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadTournament();
  }, [tournamentId]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  async function handleGenerateBracket() {
    if (!tournament) return;

    try {
      setGenerating(true);

      await generateBracket(
        tournament.id
      );

      toast.success("Bracket generated successfully!");

      router.push(
        `/tournaments/${tournament.id}/bracket`
      );

      router.refresh();
    } catch (error) {
      console.error(error);


      toast.error("Failed to generate bracket.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete() {
  try {
    setDeleting(true);

    await deleteTournament(tournamentId);

    toast.success("Tournament deleted successfully!");

    router.push("/tournaments");
    router.refresh();
  } catch (error) {
    console.error(error);

    toast.error("Failed to delete tournament.");
  } finally {
    setDeleting(false);
  }
}

  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Loading tournament...
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Tournament not found.
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-3xl font-bold">
            {tournament.name}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {tournament.status}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">
            Location
          </p>

          <p className="font-medium">
            {tournament.location}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Maximum Players
          </p>

          <p className="font-medium">
            {tournament.maxPlayers}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Format
          </p>

          <p className="font-medium">
            {tournament.format}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Start Date
          </p>

          <p className="font-medium">
            {formatDate(
              tournament.startDate
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            End Date
          </p>

          <p className="font-medium">
            {formatDate(
              tournament.endDate
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Champion
          </p>

          <div className="mt-2 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            {tournament.champion ? (
              <p className="text-xl font-bold text-yellow-700">
                🏆 {tournament.champion.name}
              </p>
            ) : (
              <p className="text-gray-500">
                Champion not decided yet
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tournaments"
            className="flex items-center gap-2 rounded border px-4 py-2"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            href={`/tournaments/${tournament.id}/edit`}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </Link>

          <button
            onClick={
              handleGenerateBracket
            }
            disabled={
              generating ||
              tournament.status ===
                "Completed"
            }
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {generating
              ? "Generating..."
              : "Generate Bracket"}
          </button>

          <Link
            href={`/tournaments/${tournament.id}/bracket`}
            className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            View Bracket
          </Link>

          <AlertDialog>
  <AlertDialogTrigger>
  <button
    disabled={deleting}
    className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
  >
    <Trash2 size={18} />
    {deleting ? "Deleting..." : "Delete"}
  </button>
</AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Delete Tournament?
      </AlertDialogTitle>

      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the tournament,
        registrations, and related data.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700"
      >
        Delete Tournament
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}