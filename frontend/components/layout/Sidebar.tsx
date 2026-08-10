import Link from "next/link";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Swords,
  Medal,
  Settings,
} from "lucide-react";

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

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm">

      {/* Logo */}
      <div className="border-b border-gray-100 p-6">
        <Link href="/" className="flex items-center gap-3">
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
  );
}