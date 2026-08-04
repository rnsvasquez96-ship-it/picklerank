import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b">
      <h1 className="text-2xl font-bold">
        PickleRank
      </h1>

      <div className="flex gap-4">
        <Button variant="ghost">
          Login
        </Button>

        <Button>
          Get Started
        </Button>
      </div>
    </nav>
  );
}