// Game information
export interface Game {
  id: string;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
  period: number;
  clock?: string;
  arena: Arena;
  officials: string[];
}

export enum GameStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  FINISHED = 'finished',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
}

export interface Arena {
  name: string;
  city: string;
  state: string;
  country: string;
}

// Team information
export interface Team {
  id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: 'East' | 'West';
  division: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

// Player statistics
export interface PlayerStats {
  player: Player;
  position: string;
  isStarter: boolean;
  minutes: number;
  points: number;
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  plusMinus: number;
  shooting: {
    fieldGoals: {
      made: number;
      attempted: number;
      percentage: number;
    };
    threePointers: {
      made: number;
      attempted: number;
      percentage: number;
    };
    freeThrows: {
      made: number;
      attempted: number;
      percentage: number;
    };
  };
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  position: string;
  height: string;
  weight: number;
  birthdate: string;
  country: string;
  college?: string;
  draft?: {
    year: number;
    round: number;
    pick: number;
  };
  headshot?: string;
}

// Team statistics
export interface TeamStats {
  team: Team;
  points: number;
  pointsByQuarter: number[];
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  shooting: {
    fieldGoals: {
      made: number;
      attempted: number;
      percentage: number;
    };
    threePointers: {
      made: number;
      attempted: number;
      percentage: number;
    };
    freeThrows: {
      made: number;
      attempted: number;
      percentage: number;
    };
  };
  fastBreakPoints: number;
  pointsInPaint: number;
  secondChancePoints: number;
  pointsOffTurnovers: number;
  biggestLead: number;
  timeLeading: string;
}

// Box score
export interface BoxScore {
  game: Game;
  homeTeamStats: TeamStats;
  awayTeamStats: TeamStats;
  homePlayerStats: PlayerStats[];
  awayPlayerStats: PlayerStats[];
  officials: string[];
  leadChanges: number;
  timesTied: number;
}

// Game flow for visualization
export interface GameFlowPoint {
  time: string;
  period: number;
  homeScore: number;
  awayScore: number;
  scoreDifferential: number;
  scoreChange: {
    team: 'home' | 'away';
    player?: Player;
    points: number;
    shotType: string;
  };
}

// Search filters
export interface GameFilters {
  dateFrom?: string;
  dateTo?: string;
  teamIds?: string[];
  playerIds?: string[];
  season?: string;
}

// UI related
export interface DataLoadingState {
  isLoading: boolean;
  error: string | null;
}