import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import TournamentTable from "@/components/tournaments/TournamentTable";
import Link from "next/link";

export default function TournamentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Tournaments
            </h1>

            <p className="text-muted-foreground">
              Manage all pickleball tournaments.
            </p>
          </div>

        <Link href="/tournaments/new">
            <Button>
             + New Tournament
            </Button>
        </Link>
        </div>
    <TournamentTable />

      </div>
    </DashboardLayout>
  );
}