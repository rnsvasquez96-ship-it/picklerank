import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TournamentPreview() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-6xl">

        <h2 className="text-center text-4xl font-bold">
          Tournament Dashboard Preview
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Manage every tournament from one powerful dashboard.
        </p>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <Card>
            <CardHeader>
              <CardTitle>
                Upcoming Tournament
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="font-semibold">
                Manila Pickle Championship 2026
              </p>

              <p className="mt-2 text-gray-600">
                August 20, 2026
              </p>

              <p className="text-gray-600">
                64 Players Registered
              </p>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>
                Live Matches
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                Court 1
              </p>

              <p className="mt-2 font-semibold">
                Team A 11 - 8 Team B
              </p>

              <p className="text-gray-600">
                Semi Final
              </p>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>
                Current Champion
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-xl font-bold">
                Alex Santos
              </p>

              <p className="text-gray-600">
                Rating: 1850
              </p>

              <p className="text-gray-600">
                Wins: 24
              </p>
            </CardContent>
          </Card>


        </div>

      </div>
    </section>
  );
}