"use client";

import {
  Trophy,
  Users,
  CalendarDays,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

type Props = {
  totalPlayers: number;
  totalTournaments: number;
  totalMatches: number;
  completedMatches: number;
};

export default function DashboardStats({
  totalPlayers,
  totalTournaments,
  totalMatches,
  completedMatches,
}: Props) {
  const stats = [
    {
      title: "Total Tournaments",
      value: totalTournaments,
      icon: Trophy,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-400",
    },
    {
      title: "Total Matches",
      value: totalMatches,
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-400",
    },
    {
      title: "Completed Matches",
      value: completedMatches,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-400",
    },
    {
      title: "Total Players",
      value: totalPlayers,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`group relative overflow-hidden rounded-2xl border ${stat.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Background Glow */}
            <div
              className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 blur-3xl ${stat.bg}`}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900">
                  {stat.value}
                </h2>

                <div className="mt-5 flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp size={16} />
                  <span className="font-medium">
                    Updated Live
                  </span>
                </div>
              </div>

              <div
                className={`rounded-2xl p-4 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${stat.bg}`}
              >
                <Icon
                  size={30}
                  className={stat.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}