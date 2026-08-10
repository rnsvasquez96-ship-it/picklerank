import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Trophy,
  Users,
  GitBranch,
  Activity,
} from "lucide-react";

const features = [
  {
    title: "Tournament Management",
    description:
      "Create and organize pickleball tournaments with schedules, player limits, formats, and real-time progress tracking.",
    icon: Trophy,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Player Registration",
    description:
      "Register players, manage profiles, assign seeds, and monitor participation across multiple tournaments.",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Automatic Brackets",
    description:
      "Instantly generate tournament brackets and automatically advance winners after every completed match.",
    icon: GitBranch,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Match Tracking",
    description:
      "Record live scores, determine winners automatically, and keep rankings updated throughout the tournament.",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Powerful Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Everything You Need to Run
            <span className="text-green-600">
              {" "}Professional Tournaments
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            PickleRank provides modern tools for tournament
            organizers, clubs, schools, and pickleball
            communities to manage events effortlessly.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-8">

                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-gray-600">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
}