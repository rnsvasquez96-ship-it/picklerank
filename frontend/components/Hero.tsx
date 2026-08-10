import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white">

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[250px] w-[250px] rounded-full bg-lime-200/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700 shadow-sm">
          <Trophy size={16} />
          Professional Pickleball Tournament Platform
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl">
          Manage
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {" "}
            Pickleball Tournaments
          </span>
          <br />
          Like a Professional
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
          Create tournaments, register players, generate brackets
          automatically, update match scores in real time, and
          monitor rankings—all from one modern platform.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <Link href="/tournaments/new">
            <Button
              size="lg"
              className="rounded-full bg-green-600 px-8 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
            >
              Create Tournament
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/tournaments">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 transition-all duration-300 hover:scale-105"
            >
              Explore Tournaments
            </Button>
          </Link>

        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">

          <div className="rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-3xl font-bold text-green-600">
              64+
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Tournament Capacity
            </p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-3xl font-bold text-green-600">
              500+
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Registered Players
            </p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-3xl font-bold text-green-600">
              1,200+
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Matches Managed
            </p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-3xl font-bold text-green-600">
              100%
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Automated Brackets
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}