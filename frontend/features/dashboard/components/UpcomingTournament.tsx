import {
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

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
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-gradient-to-r from-green-50 to-emerald-50 p-6">

        <div className="rounded-2xl bg-green-100 p-3">
          <Trophy
            size={26}
            className="text-green-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Upcoming Tournament
          </h2>

          <p className="text-sm text-gray-500">
            The next scheduled competition.
          </p>
        </div>

      </div>

      <div className="p-6">

        {!tournament ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
            <Trophy
              size={40}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-medium">
              No upcoming tournament
            </p>

            <p className="mt-1 text-sm">
              Create your next event to see it here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {tournament.name}
                </h3>

                <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {tournament.status}
                </span>
              </div>

            </div>

            <div className="mt-8 grid gap-4">

              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <MapPin
                  className="text-green-600"
                  size={20}
                />

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {tournament.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <Users
                  className="text-blue-600"
                  size={20}
                />

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Players
                  </p>

                  <p className="font-semibold">
                    {tournament.maxPlayers} Registered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <CalendarDays
                  className="text-orange-600"
                  size={20}
                />

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Start Date
                  </p>

                  <p className="font-semibold">
                    {new Date(
                      tournament.startDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <CalendarDays
                  className="text-red-600"
                  size={20}
                />

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    End Date
                  </p>

                  <p className="font-semibold">
                    {new Date(
                      tournament.endDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
              View Tournament
              <ArrowRight size={18} />
            </button>
          </>
        )}

      </div>
    </div>
  );
}