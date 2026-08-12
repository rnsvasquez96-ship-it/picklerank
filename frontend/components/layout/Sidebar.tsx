"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Swords,
  Medal,
  Settings,
  X,
} from "lucide-react";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
  },
  {
    title: "Players",
    href: "/players",
    icon: Users,
  },
  {
    title: "Matches",
    href: "/matches",
    icon: Swords,
  },
  {
    title: "Rankings",
    href: "/rankings",
    icon: Medal,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          border-r border-gray-200
          bg-white shadow-sm
          transition-transform duration-300
          lg:z-40
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-md">
                🏓
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  PickleRank
                </h1>

                <p className="text-xs text-gray-500">
                  Tournament System
                </p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-gray-600
                      transition-all
                      duration-200
                      hover:bg-green-50
                      hover:text-green-600
                      hover:shadow-sm
                    "
                  >
                    <Icon
                      size={20}
                      className="transition-transform group-hover:scale-110"
                    />

                    <span className="font-medium">
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4">
          <div className="rounded-xl bg-green-50 p-3 text-center">
            <p className="text-xs font-semibold text-green-700">
              PickleRank v1.0
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Tournament Management
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}