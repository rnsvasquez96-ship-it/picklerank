import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Tournament Management",
    description:
      "Create and organize pickleball tournaments with schedules, divisions, and rules.",
  },
  {
    title: "Player Registration",
    description:
      "Allow players to register, manage profiles, and track tournament participation.",
  },
  {
    title: "Automatic Brackets",
    description:
      "Generate tournament brackets automatically and advance winners instantly.",
  },
  {
    title: "Match Tracking",
    description:
      "Record scores, update match results, and monitor tournament progress.",
  },
];

export default function Features() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-6xl">

        <h2 className="text-center text-4xl font-bold">
          Everything You Need To Run Tournaments
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Powerful tools for organizers, players, and pickleball communities.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>

            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}