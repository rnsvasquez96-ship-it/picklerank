import { z } from "zod";

export const tournamentSchema = z.object({
  name: z.string().min(3, "Tournament name is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string(),
  endDate: z.string(),
  maxPlayers: z.coerce.number().min(2).max(256),
});

export type TournamentFormValues = z.infer<typeof tournamentSchema>;