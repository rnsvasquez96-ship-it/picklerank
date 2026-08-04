import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Button>Create Tournament</Button>

        <Button variant="outline">
          Register Player
        </Button>

        <Button variant="outline">
          Record Match
        </Button>

        <Button variant="outline">
          View Rankings
        </Button>
      </CardContent>
    </Card>
  );
}