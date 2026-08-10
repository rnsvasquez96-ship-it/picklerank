import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CalendarDays,
  Trophy,
  Activity,
  Users,
  Medal,
} from "lucide-react";

export default function TournamentPreview() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Tournament Dashboard
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage tournaments,
            players, matches, and rankings from one
            modern dashboard.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {/* Upcoming Tournament */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader className="pb-3">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <CalendarDays className="text-green-600" size={24} />
              </div>

              <CardTitle>
                Upcoming Tournament
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <h3 className="text-xl font-bold">
                Manila Pickle Championship 2026
              </h3>

              <p className="text-gray-500">
                August 20, 2026
              </p>

              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} />
                64 Players Registered
              </div>

              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Registration Open
              </span>
            </CardContent>
          </Card>

          {/* Live Matches */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader className="pb-3">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Activity className="text-blue-600" size={24} />
              </div>

              <CardTitle>
                Live Match
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Court 1
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  LIVE
                </span>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between font-semibold">
                  <span>Team A</span>
                  <span>11</span>
                </div>

                <div className="my-2 border-t"></div>

                <div className="flex justify-between font-semibold">
                  <span>Team B</span>
                  <span>8</span>
                </div>
              </div>

              <p className="font-medium text-gray-600">
                Semifinal Match
              </p>

            </CardContent>
          </Card>

          {/* Champion */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader className="pb-3">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                <Trophy className="text-yellow-500" size={24} />
              </div>

              <CardTitle>
                Current Champion
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                  <Medal
                    className="text-yellow-500"
                    size={28}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Alex Santos
                  </h3>

                  <p className="text-gray-500">
                    Professional Player
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-sm text-gray-500">
                    Rating
                  </p>

                  <p className="text-xl font-bold text-green-600">
                    1850
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-sm text-gray-500">
                    Wins
                  </p>

                  <p className="text-xl font-bold text-green-600">
                    24
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
}