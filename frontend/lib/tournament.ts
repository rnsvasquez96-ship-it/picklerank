import { api } from "./api";

export async function getTournaments() {
  const response = await api.get("/tournament");
  return response.data;
}

export async function createTournament(data: any) {
  const response = await api.post("/tournament", data);
  return response.data;
}