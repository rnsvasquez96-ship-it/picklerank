"use client";

import {
  Trophy,
  Users,
  CalendarDays,
  CheckCircle,
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
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      title: "Total Matches",
      value: totalMatches,
      icon: CalendarDays,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Completed Matches",
      value: completedMatches,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Total Players",
      value: totalPlayers,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`rounded-full p-3 ${stat.bg}`}
              >
                <Icon
                  size={28}
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