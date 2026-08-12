const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getRegistrations(
  tournamentId: number
) {
  const res = await fetch(
    `${API_URL}/registration/tournament/${tournamentId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch registrations");
  }

  return res.json();
}

export async function registerPlayer(data: {
  tournamentId: number;
  playerId: number;
}) {
  const res = await fetch(
    `${API_URL}/registration`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to register player");
  }

  return res.json();
}

export async function removeRegistration(
  id: number
) {
  const res = await fetch(
    `${API_URL}/registration/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove registration");
  }

  return res.json();
}