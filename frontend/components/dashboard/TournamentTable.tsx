import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tournaments = [
  {
    id: 1,
    name: "Manila Open 2026",
    date: "Aug 20, 2026",
    players: 64,
    status: "Registration Open",
  },
  {
    id: 2,
    name: "Laguna Championship",
    date: "Sept 5, 2026",
    players: 32,
    status: "Bracket Ready",
  },
  {
    id: 3,
    name: "Batangas Cup",
    date: "Sept 18, 2026",
    players: 48,
    status: "In Progress",
  },
];

export default function TournamentTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tournaments</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {tournament.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {tournament.date}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {tournament.players} Players
                </p>

                <p className="text-sm text-blue-600">
                  {tournament.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}