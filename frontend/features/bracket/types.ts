export type BracketMatch = {
  id: number;
  round: number;
  status: string;

  player1Score: number | null;
  player2Score: number | null;

  player1: {
    id: number;
    name: string;
  } | null;

  player2: {
    id: number;
    name: string;
  } | null;

  winner: {
    id: number;
    name: string;
  } | null;
};