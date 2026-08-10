"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";

type Props = {
  totalPlayers: number;
  totalMatches: number;
  completedMatches: number;
  totalTournaments: number;
};

export default function DashboardCharts({
  totalPlayers,
  totalMatches,
  completedMatches,
  totalTournaments,
}: Props) {
  const barData = [
    {
      name: "Players",
      value: totalPlayers,
    },
    {
      name: "Tournaments",
      value: totalTournaments,
    },
    {
      name: "Matches",
      value: totalMatches,
    },
  ];

  const pieData = [
    {
      name: "Completed",
      value: completedMatches,
    },
    {
      name: "Remaining",
      value: Math.max(
        totalMatches - completedMatches,
        0
      ),
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-2">

      {/* Analytics */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-3">
            <BarChart3
              size={26}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              System Overview
            </h2>

            <p className="text-sm text-gray-500">
              Players, tournaments and matches.
            </p>
          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={330}
        >
          <BarChart
            data={barData}
            margin={{
              top: 10,
              right: 20,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#f3f4f6",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Progress */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-2xl bg-green-100 p-3">
            <PieChartIcon
              size={26}
              className="text-green-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Match Progress
            </h2>

            <p className="text-sm text-gray-500">
              Completed vs remaining matches.
            </p>
          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={330}
        >
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}