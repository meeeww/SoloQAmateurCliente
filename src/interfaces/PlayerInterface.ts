export enum PlayerRole {
  TOP = "Toplaner",
  JUNGLE = "Jungler",
  MID = "Midlaner",
  ADC = "ADC",
  SUPP = "Support",
}

export interface Player {
  id: number;
  positionTable: number;
  username: string;
  leagueName: string;
  leagueTag: string;
  leaguePuuid: string | null;
  leagueId: string | null;
  twitter: string | null;
  twitch: string | null;
  discord: string | null;
  icon: string | null;
  tier: string;
  rank: string;
  leaguePoints: number;
  elo: number
  partidas: number;
  victorias: number;
  derrotas: number;
  winRate: number;
  opgg: string;
  createdAt: number;
  lastUpdate: number;
  teamName: string;
  rol: PlayerRole | null;
}
