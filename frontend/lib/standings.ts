const API_URL = "http://localhost:3001";

export async function getStandings(
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