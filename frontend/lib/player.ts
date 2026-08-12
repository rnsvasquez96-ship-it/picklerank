const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getPlayers() {
  const res = await fetch(`${API_URL}/player`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch players");
  }

  return res.json();
}

export async function getPlayer(id: number) {
  const res = await fetch(`${API_URL}/player/${id}`, {
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error("Failed to fetch player");
  }

  return text ? JSON.parse(text) : null;
}

export async function createPlayer(data: {
  name: string;
  email: string;
  phone?: string;
  skill?: string;
}) {
  const res = await fetch(`${API_URL}/player`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create player");
  }

  return res.json();
}

export async function updatePlayer(
  id: number,
  data: {
    name: string;
    email: string;
    phone?: string;
    skill?: string;
  }
) {
  const res = await fetch(`${API_URL}/player/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update player");
  }

  return res.json();
}

export async function deletePlayer(id: number) {
  const res = await fetch(`${API_URL}/player/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete player");
  }

  return res.json();
}