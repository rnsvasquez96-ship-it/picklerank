import Link from "next/link";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="rounded-xl bg-green-600 p-2 shadow-md">
            <Trophy
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              PickleRank
            </h1>

            <p className="text-xs text-gray-500">
              Tournament Management
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Dashboard
          </Link>

          <Link
            href="/tournaments"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Tournaments
          </Link>

          <Link
            href="/players"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Players
          </Link>

          <Link
            href="/matches"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Matches
          </Link>

          <Link
            href="/rankings"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
          >
            Rankings
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="rounded-full px-6"
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/tournaments/new">
            <Button
              className="rounded-full bg-green-600 px-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}