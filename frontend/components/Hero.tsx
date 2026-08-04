import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-8 py-24 text-center">
      <h1 className="text-5xl font-bold">
        Manage Pickleball Tournaments
        <br />
        Like a Professional
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Create tournaments, manage players,
        generate brackets, and track matches.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button>
          Create Tournament
        </Button>

        <Button variant="outline">
          Explore Tournaments
        </Button>
      </div>
    </section>
  );
}