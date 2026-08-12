const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getRankings() {
  const res = await fetch(
    `${API_URL}/ranking`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch rankings",
    );
  }

  return res.json();
}

export async function getTournamentStandings(
  tournamentId: number,
) {
  const res = await fetch(
    `${API_URL}/tournament/${tournamentId}/standings`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch standings",
    );
  }

  return res.json();
}