type Tournament = {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
};

type Props = {
  tournament: Tournament | null;
};

export default function UpcomingTournament({
  tournament,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        🏆 Upcoming Tournament
      </h2>

      {!tournament ? (
        <p className="text-gray-500">
          No upcoming tournament.
        </p>
      ) : (
        <div className="space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {tournament.name}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {tournament.location}
          </p>

          <p>
            <strong>Players:</strong>{" "}
            {tournament.maxPlayers}
          </p>

          <p>
            <strong>Start:</strong>{" "}
            {new Date(
              tournament.startDate
            ).toLocaleDateString()}
          </p>

          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {tournament.status}
          </span>
        </div>
      )}
    </div>
  );
}