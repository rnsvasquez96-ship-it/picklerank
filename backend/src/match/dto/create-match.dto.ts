export class CreateMatchDto {
  tournamentId: number;

  player1Id: number;

  player2Id: number;

  player1Score: number;

  player2Score: number;

  winnerId?: number;

  status: string;
}