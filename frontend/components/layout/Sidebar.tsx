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
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          🏓 PickleRank
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-100"
                >
                  <Icon size={20} />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}