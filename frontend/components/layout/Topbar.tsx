import { Bell, CircleUserRound } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />

        <CircleUserRound className="cursor-pointer" />
      </div>
    </header>
  );
}