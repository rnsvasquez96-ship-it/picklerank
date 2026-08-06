import {
  Trophy,
  Users,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import { getTournaments } from "@/lib/tournament";


export default async function StatsCards() {

  const tournaments = await getTournaments();


  const totalTournaments = tournaments.length;


  const upcomingTournaments =
    tournaments.filter(
      (tournament: any) =>
        tournament.status === "Upcoming"
    ).length;


  const completedTournaments =
    tournaments.filter(
      (tournament: any) =>
        tournament.status === "Completed"
    ).length;


  const totalPlayers =
    tournaments.reduce(
      (
        total: number,
        tournament: any
      ) =>
        total + tournament.maxPlayers,
      0
    );



  const stats = [
    {
      title: "Total Tournaments",
      value: totalTournaments,
      icon: Trophy,
    },

    {
      title: "Upcoming",
      value: upcomingTournaments,
      icon: CalendarDays,
    },

    {
      title: "Player Capacity",
      value: totalPlayers,
      icon: Users,
    },

    {
      title: "Completed",
      value: completedTournaments,
      icon: CheckCircle,
    },
  ];



  return (

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


      {stats.map((stat)=> {

        const Icon = stat.icon;


        return (

          <div
            key={stat.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">


              <div>

                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>


                <h2 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h2>

              </div>



              <div className="rounded-lg bg-blue-100 p-3">

                <Icon
                  size={24}
                  className="text-blue-600"
                />

              </div>


            </div>


          </div>

        );

      })}


    </div>

  );
}