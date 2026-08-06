const API_URL = "http://localhost:3001";

export async function getRankings() {
  const res = await fetch(`${API_URL}/ranking`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rankings");
  }

  return res.json();
}