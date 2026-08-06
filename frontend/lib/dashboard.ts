const API_URL = "http://localhost:3001";

export async function getDashboard() {
  const res = await fetch(`${API_URL}/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}