import {
  Bell,
  CircleUserRound,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-8 backdrop-blur">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back to PickleRank
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

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

        {/* Notification */}
        <div className="relative group">
  <button className="relative rounded-xl p-2 transition hover:bg-gray-100">
    <Bell size={20} />

    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
  </button>

  <div className="absolute right-0 mt-3 hidden w-80 rounded-2xl border border-gray-200 bg-white shadow-xl group-hover:block">

    <div className="border-b p-4">
      <h3 className="font-semibold">
        Notifications
      </h3>
    </div>

    <div className="max-h-80 overflow-y-auto">

      <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
        <p className="font-medium">
          🏆 Summer Open starts tomorrow
        </p>

        <p className="text-xs text-gray-500">
          2 minutes ago
        </p>
      </div>

      <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
        <p className="font-medium">
          👤 John Cruz registered
        </p>

        <p className="text-xs text-gray-500">
          15 minutes ago
        </p>
      </div>

      <div className="cursor-pointer border-b p-4 hover:bg-gray-50">
        <p className="font-medium">
          🎾 Match #24 completed
        </p>

        <p className="text-xs text-gray-500">
          1 hour ago
        </p>
      </div>

      <div className="cursor-pointer p-4 hover:bg-gray-50">
        <p className="font-medium">
          🏅 Rankings updated
        </p>

        <p className="text-xs text-gray-500">
          Today
        </p>
      </div>

    </div>

    <button className="w-full border-t p-3 text-sm font-semibold text-green-600 hover:bg-green-50">
      View All Notifications
    </button>

  </div>
</div>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CircleUserRound
              size={22}
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