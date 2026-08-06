const API_URL = "http://localhost:3001";

export async function generateBracket(
  tournamentId: number,
) {
  const res = await fetch(
    `${API_URL}/tournament/${tournamentId}/generate-bracket`,
    {
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to generate bracket.");
  }

  return res.json();
}

export async function getBracket(
  tournamentId: number,
) {
  const res = await fetch(
    `${API_URL}/match/tournament/${tournamentId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load bracket.");
  }

  return res.json();
}