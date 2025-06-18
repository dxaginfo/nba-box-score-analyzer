// Loading states
export interface DataLoadingState {
  isLoading: boolean;
  error: string | null;
}

// Game status enum
export enum GameStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  FINISHED = 'finished',
  POSTPONED = 'postponed',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled'
}

// Team information
export interface Team {
  id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: string;
  division: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

// Arena information
export interface Arena {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
}

// Game information
export interface Game {
  id: string;
  date: string;
  status: GameStatus;
  period: number;
  clock: string | null;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  arena: Arena;
}

// Shooting statistics
export interface ShootingStats {
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
}

// Rebounding statistics
export interface ReboundStats {
  offensive: number;
  defensive: number;
  total: number;
}

// Team statistics
export interface TeamStats {
  team: Team;
  points: number;
  pointsByQuarter: number[];
  shooting: ShootingStats;
  rebounds: ReboundStats;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fastBreakPoints: number;
  pointsInPaint: number;
  secondChancePoints: number;
  pointsOffTurnovers: number;
  biggestLead: number;
  timeLeading: string;
}

// Player information
export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  position: string;
  headshot: string;
}

// Player statistics
export interface PlayerStats {
  player: Player;
  starter: boolean;
  minutes: string;
  points: number;
  rebounds: ReboundStats;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  plusMinus: number;
  shooting: ShootingStats;
}

// Box score for a game
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

// Player comparison stats
export interface PlayerComparisonStats {
  player: Player;
  team: Team;
  season: string;
  games: number;
  gamesStarted: number;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  efficiency: number;
  plusMinus: number;
}

// Team efficiency stats
export interface TeamEfficiencyStats {
  team: Team;
  season: string;
  offensiveRating: number;
  defensiveRating: number;
  netRating: number;
  pace: number;
  trueShootingPercentage: number;
  effectiveFieldGoalPercentage: number;
  turnoverPercentage: number;
  offensiveReboundPercentage: number;
  defensiveReboundPercentage: number;
  totalReboundPercentage: number;
  assistPercentage: number;
  stealPercentage: number;
  blockPercentage: number;
}

// Game Flow data point
export interface GameFlowDataPoint {
  time: string;
  period: number;
  homeScore: number;
  awayScore: number;
  scoreDifferential: number;
  play: string;
}

// API Service interfaces
export interface GameQueryParams {
  dateFrom?: string;
  dateTo?: string;
  teamId?: string;
  limit?: number;
}

// API Service response types
export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}