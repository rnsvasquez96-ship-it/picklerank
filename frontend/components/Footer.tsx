import Link from "next/link";
import {
  Trophy,
  Globe,
  Mail,
  User,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-600 p-2">
                <Trophy
                  className="text-white"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  PickleRank
                </h2>

                <p className="text-sm text-gray-400">
                  Tournament Management System
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-gray-400">
              PickleRank is a modern tournament
              management platform designed to help
              organizers create tournaments,
              register players, generate brackets,
              manage matches, and track rankings
              with ease.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                href="/"
                className="transition hover:text-green-400"
              >
                Home
              </Link>

              <Link
                href="/dashboard"
                className="transition hover:text-green-400"
              >
                Dashboard
              </Link>

              <Link
                href="/tournaments"
                className="transition hover:text-green-400"
              >
                Tournaments
              </Link>

              <Link
                href="/players"
                className="transition hover:text-green-400"
              >
                Players
              </Link>

              <Link
                href="/rankings"
                className="transition hover:text-green-400"
              >
                Rankings
              </Link>

            </div>
          </div>

          {/* Connect */}
          <div>

            <h3 className="mb-5 font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/rnsvasquez96-ship-it"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition hover:bg-green-600"
              >
                <Globe size={20} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition hover:bg-green-600"
              >
                <User size={20} />
              </a>

              <a
                href="mailto:your@email.com"
                className="rounded-full bg-white/10 p-3 transition hover:bg-green-600"
              >
                <Mail size={20} />
              </a>

            </div>

            <p className="mt-6 text-sm leading-6 text-gray-400">
              Built with Next.js, NestJS,
              Prisma, PostgreSQL,
              Tailwind CSS, and TypeScript.
            </p>

          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 PickleRank. All rights reserved.
          </p>

          <p>
            Designed & Developed by Ranz Vasquez
          </p>

        </div>

      </div>
    </footer>
  );
}