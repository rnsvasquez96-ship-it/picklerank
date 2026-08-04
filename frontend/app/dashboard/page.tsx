import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import TournamentTable from "@/components/dashboard/TournamentTable";
import QuickActions from "@/components/dashboard/QuickActions";
import Link from "next/link";

import {
  Trophy,
  Users,
  Swords,
  Building2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    
    <DashboardLayout>
        <Link
            href="/dashboard/create"
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                >
            + Create Tournament
        </Link>
      <div className="space-y-8">

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Tournaments"
            value={12}
            icon={<Trophy />}
          />

          <StatCard
            title="Players"
            value={248}
            icon={<Users />}
          />

          <StatCard
            title="Matches"
            value={64}
            icon={<Swords />}
          />

          <StatCard
            title="Courts"
            value={18}
            icon={<Building2 />}
          />
        </div>

        
        <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
    <TournamentTable />
        </div>

    <QuickActions />

        </div>

      </div>
    </DashboardLayout>
  );
}