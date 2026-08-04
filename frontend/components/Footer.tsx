export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-8 text-center md:flex-row">
        <div>
          <h3 className="text-xl font-bold">PickleRank</h3>
          <p className="text-sm text-gray-500">
            Professional Pickleball Tournament Management System
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Contact</a>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 PickleRank. All rights reserved.
        </p>
      </div>
    </footer>
  );
}