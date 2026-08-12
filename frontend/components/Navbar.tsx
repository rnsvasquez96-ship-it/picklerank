"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="rounded-xl bg-green-600 p-2 shadow-md">
            <Trophy
           size={22}
           className="text-white sm:h-6 sm:w-6"
           />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              PickleRank
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Tournament Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
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

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard">
            <Button variant="ghost" className="rounded-full px-5">
              Dashboard
            </Button>
          </Link>

          <Link href="/tournaments/new">
            <Button className="rounded-full bg-green-600 px-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-5 pt-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Dashboard
            </Link>

            <Link
              href="/tournaments"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Tournaments
            </Link>

            <Link
              href="/players"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Players
            </Link>

            <Link
              href="/matches"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Matches
            </Link>

            <Link
              href="/rankings"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
            >
              Rankings
            </Link>

            <div className="mt-3 flex flex-col gap-2 border-t pt-4">
              <Link href="/dashboard" onClick={closeMenu}>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Dashboard
                </Button>
              </Link>

              <Link href="/tournaments/new" onClick={closeMenu}>
                <Button className="w-full rounded-full bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}