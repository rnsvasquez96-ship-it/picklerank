import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";

import { getTournaments } from "@/lib/tournament";
import TournamentList from "@/features/tournament/components/TournamentList";


export default async function TournamentsPage() {

  const tournaments = await getTournaments();


  return (
    <DashboardLayout>

      <div className="mx-auto max-w-6xl space-y-8 p-8">


        <div className="flex justify-between">


          <div>

            <h1 className="text-3xl font-bold">
              Tournaments
            </h1>


            <p className="text-muted-foreground">
              Manage your tournaments.
            </p>


          </div>



          <Link
            href="/tournaments/new"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            + New Tournament
          </Link>


        </div>



        <TournamentList
          tournaments={tournaments}
        />


      </div>


    </DashboardLayout>
  );
}