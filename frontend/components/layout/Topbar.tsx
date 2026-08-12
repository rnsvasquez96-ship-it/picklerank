"use client";

import { useState } from "react";
import {
  Bell,
  CircleUserRound,
  Menu,
  Search,
  X,
} from "lucide-react";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Dashboard
          </h1>

          <p className="hidden text-sm text-gray-500 sm:block">
            Welcome back to PickleRank
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            className="relative rounded-xl p-2 transition hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-semibold">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setNotificationsOpen(false)
                  }
                  className="rounded-lg p-1 hover:bg-gray-100"
                  aria-label="Close notifications"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">

                <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
                  <p className="font-medium">
                    🏆 Summer Open starts tomorrow
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    2 minutes ago
                  </p>
                </div>

                <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
                  <p className="font-medium">
                    👤 John Cruz registered
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    15 minutes ago
                  </p>
                </div>

                <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
                  <p className="font-medium">
                    🎾 Match #24 completed
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    1 hour ago
                  </p>
                </div>

                <div className="cursor-pointer p-4 hover:bg-gray-50">
                  <p className="font-medium">
                    🏅 Rankings updated
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Today
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="w-full border-t p-3 text-sm font-semibold text-green-600 hover:bg-green-50"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-2 py-2 transition hover:bg-gray-50 sm:px-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 sm:h-10 sm:w-10">
            <CircleUserRound
              size={21}
              className="text-green-700"
            />
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-gray-900">
              Ranz Vasquez
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </button>

      </div>
    </header>
  );
}