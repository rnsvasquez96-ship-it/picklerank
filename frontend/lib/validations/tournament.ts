import { z } from "zod";

export const tournamentSchema = z.object({
  name: z.string().min(3, "Tournament name must be at least 3 characters."),
  location: z.string().min(2, "Location is required."),
  maxPlayers: z.coerce.number().min(2).max(128),
});

export type TournamentFormData = z.infer<typeof tournamentSchema>;