import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getTournaments } from "@/lib/tournament";

export default async function TournamentTable() {
  const tournaments = await getTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tournaments</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tournaments.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tournaments found.
            </p>
          ) : (
            tournaments.map((tournament: any) => (
              <div
                key={tournament.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {tournament.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {tournament.location}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(tournament.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    {tournament.maxPlayers} Players
                  </p>

                  <p className="text-sm text-green-600">
                    Upcoming
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}