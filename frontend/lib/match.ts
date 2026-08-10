const API_URL = "http://localhost:3001";

export type MatchPayload = {
  tournamentId: number;
  player1Id: number;
  player2Id: number;
  player1Score: number;
  player2Score: number;
  winnerId?: number;
  status: string;
};

export type MatchResultPayload = {
  player1Score: number;
  player2Score: number;
};

export async function getMatches() {
  const res = await fetch(`${API_URL}/match`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }

  return res.json();
}

export async function getMatchesByTournament(
  tournamentId: number,
) {
  const res = await fetch(
    `${API_URL}/match/tournament/${tournamentId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch tournament matches",
    );
  }

  return res.json();
}

export async function getMatch(id: number) {
  const res = await fetch(
    `${API_URL}/match/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch match");
  }

  return res.json();
}

export async function createMatch(
  data: MatchPayload,
) {
  const res = await fetch(
    `${API_URL}/match`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to create match",
    );
  }

  return res.json();
}

export async function updateMatch(
  id: number,
  data: MatchPayload,
) {
  const res = await fetch(
    `${API_URL}/match/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to update match",
    );
  }

  return res.json();
}

export async function updateMatchResult(
  id: number,
  data: MatchResultPayload,
) {
  const res = await fetch(
    `${API_URL}/match/${id}/result`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to update match result",
    );
  }

  return res.json();
}

export async function deleteMatch(
  id: number,
) {
  const res = await fetch(
    `${API_URL}/match/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to delete match",
    );
  }

  return res.json();
}

export async function getTournamentOptions() {
  const res = await fetch(
    `${API_URL}/tournament`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch tournaments",
    );
  }

  return res.json();
}

export async function getPlayerOptions() {
  const res = await fetch(
    `${API_URL}/player`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch players",
    );
  }

  return res.json();
}