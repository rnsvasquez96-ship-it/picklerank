export class CreateTournamentDto {
  name: string;

  location: string;

  startDate: Date;

  endDate: Date;

  maxPlayers: number;

  status: string;

  format: string;
}