const API_URL = process.env.NEXT_PUBLIC_API_URL!;


// GET SINGLE TOURNAMENT
export async function getTournament(id: number) {

  const res = await fetch(
    `${API_URL}/tournament/${id}`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to fetch tournament"
    );
  }


  return res.json();

}



// GET ALL TOURNAMENTS
export async function getTournaments() {

  const res = await fetch(
    `${API_URL}/tournament`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to fetch tournaments"
    );
  }


  return res.json();

}



// CREATE TOURNAMENT
export async function createTournament(data: {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  status: string;
  format: string;
}) {


  const res = await fetch(
    `${API_URL}/tournament`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to create tournament"
    );
  }


  return res.json();

}




// UPDATE TOURNAMENT
export async function updateTournament(
  id: number,
  data: {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    maxPlayers: number;
    status: string;
    format: string;
  }
) {


  const res = await fetch(
    `${API_URL}/tournament/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to update tournament"
    );
  }


  return res.json();

}




// DELETE TOURNAMENT
export async function deleteTournament(id: number) {


  const res = await fetch(
    `${API_URL}/tournament/${id}`,
    {
      method: "DELETE",
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to delete tournament"
    );
  }


  return res.json();

}