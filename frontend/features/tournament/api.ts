import { api } from "@/lib/api";

export async function getTournaments() {
  const { data } = await api.get("/tournament");
  return data;
}

export async function createTournament(data: any) {
  const response = await api.post("/tournament", data);
  return response.data;
}