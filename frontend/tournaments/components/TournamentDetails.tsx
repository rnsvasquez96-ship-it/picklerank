"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  ArrowLeft,
  Trash2,
} from "lucide-react";

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

import { useRouter } from "next/navigation";


type Tournament = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
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



  useEffect(() => {

    async function loadTournament() {

      try {

        const data =
          await getTournament(tournamentId);

        setTournament(data);

      } catch(error) {

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




  async function handleDelete() {

    const confirmDelete =
      confirm(
        "Are you sure you want to delete this tournament?"
      );


    if(!confirmDelete) return;


    try {

      await deleteTournament(
        tournamentId
      );


      alert(
        "Tournament deleted successfully!"
      );


      router.push("/tournaments");

      router.refresh();


    } catch(error) {

      console.error(error);

      alert(
        "Failed to delete tournament."
      );

    }

  }




  function formatDate(date:string){

    return new Date(date)
      .toLocaleDateString(
        "en-US",
        {
          year:"numeric",
          month:"long",
          day:"numeric",
        }
      );

  }




  if(loading){

    return (
      <Card>
        <CardContent className="p-6">
          Loading tournament...
        </CardContent>
      </Card>
    );

  }



  if(!tournament){

    return (
      <Card>
        <CardContent className="p-6">
          Tournament not found.
        </CardContent>
      </Card>
    );

  }




  return (

    <Card>


      <CardHeader>

        <CardTitle className="flex justify-between items-center">

          <span>
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





        <div className="flex gap-3">


          <Link
            href="/tournaments"
            className="flex items-center gap-2 rounded border px-4 py-2"
          >

            <ArrowLeft size={18}/>
            Back

          </Link>




          <Link
            href={`/tournaments/${tournament.id}/edit`}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
          >

            <Pencil size={18}/>
            Edit

          </Link>





          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white"
          >

            <Trash2 size={18}/>
            Delete

          </button>



        </div>



      </CardContent>


    </Card>

  );

}