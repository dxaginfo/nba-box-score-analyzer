import axios from 'axios';
import { BoxScore, Game, GameFilters, Player, Team } from '@/types';

// In a production app, we would use environment variables for the API base URL
// For this demo, we'll use mocked data since we don't have a real API
const API_BASE_URL = 'https://api.example.com/nba/v1';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for fetching data
export const ApiService = {
  // Fetch list of games based on filters
  async getGames(filters?: GameFilters): Promise<Game[]> {
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/games', { params: filters });
      // return response.data;
      
      // For now, return mock data
      return mockGames;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  // Fetch detailed box score for a specific game
  async getBoxScore(gameId: string): Promise<BoxScore> {
    try {
      // In a real app, this would be an API call
      // const response = await api.get(`/games/${gameId}/boxscore`);
      // return response.data;
      
      // For now, return mock data
      return mockBoxScore;
    } catch (error) {
      console.error('Error fetching box score:', error);
      throw error;
    }
  },

  // Fetch team information
  async getTeam(teamId: string): Promise<Team> {
    try {
      // In a real app, this would be an API call
      // const response = await api.get(`/teams/${teamId}`);
      // return response.data;
      
      // For now, return mock data
      const team = mockTeams.find(t => t.id === teamId);
      if (!team) throw new Error('Team not found');
      return team;
    } catch (error) {
      console.error('Error fetching team:', error);
      throw error;
    }
  },

  // Fetch player information
  async getPlayer(playerId: string): Promise<Player> {
    try {
      // In a real app, this would be an API call
      // const response = await api.get(`/players/${playerId}`);
      // return response.data;
      
      // For now, return mock data
      const player = mockPlayers.find(p => p.id === playerId);
      if (!player) throw new Error('Player not found');
      return player;
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error;
    }
  },

  // Fetch all teams
  async getAllTeams(): Promise<Team[]> {
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/teams');
      // return response.data;
      
      // For now, return mock data
      return mockTeams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }
};

// Mock data for development
const mockTeams: Team[] = [
  {
    id: '1610612737',
    name: 'Hawks',
    city: 'Atlanta',
    abbreviation: 'ATL',
    conference: 'East',
    division: 'Southeast',
    logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
    primaryColor: '#E03A3E',
    secondaryColor: '#C1D32F'
  },
  {
    id: '1610612738',
    name: 'Celtics',
    city: 'Boston',
    abbreviation: 'BOS',
    conference: 'East',
    division: 'Atlantic',
    logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    primaryColor: '#007A33',
    secondaryColor: '#FFFFFF'
  },
  // Add more teams as needed
];

const mockPlayers: Player[] = [
  {
    id: '1',
    firstName: 'LeBron',
    lastName: 'James',
    jerseyNumber: '23',
    position: 'F',
    height: '6-9',
    weight: 250,
    birthdate: '1984-12-30',
    country: 'USA',
    college: 'St. Vincent-St. Mary HS (OH)',
    draft: {
      year: 2003,
      round: 1,
      pick: 1
    },
    headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
  },
  // Add more players as needed
];

const mockGames: Game[] = [
  {
    id: 'game1',
    date: '2025-06-15T19:30:00Z',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    homeScore: 105,
    awayScore: 98,
    status: 'finished' as any,
    period: 4,
    arena: {
      name: 'State Farm Arena',
      city: 'Atlanta',
      state: 'GA',
      country: 'USA'
    },
    officials: ['John Smith', 'Mary Johnson', 'Robert Williams']
  },
  // Add more games as needed
];

const mockBoxScore: BoxScore = {
  game: mockGames[0],
  homeTeamStats: {
    team: mockTeams[0],
    points: 105,
    pointsByQuarter: [28, 24, 31, 22],
    rebounds: {
      offensive: 10,
      defensive: 30,
      total: 40
    },
    assists: 22,
    steals: 7,
    blocks: 5,
    turnovers: 13,
    fouls: 18,
    shooting: {
      fieldGoals: {
        made: 40,
        attempted: 86,
        percentage: 46.5
      },
      threePointers: {
        made: 12,
        attempted: 32,
        percentage: 37.5
      },
      freeThrows: {
        made: 13,
        attempted: 17,
        percentage: 76.5
      }
    },
    fastBreakPoints: 15,
    pointsInPaint: 46,
    secondChancePoints: 12,
    pointsOffTurnovers: 18,
    biggestLead: 14,
    timeLeading: '28:42'
  },
  awayTeamStats: {
    team: mockTeams[1],
    points: 98,
    pointsByQuarter: [22, 26, 28, 22],
    rebounds: {
      offensive: 9,
      defensive: 31,
      total: 40
    },
    assists: 19,
    steals: 8,
    blocks: 4,
    turnovers: 15,
    fouls: 16,
    shooting: {
      fieldGoals: {
        made: 37,
        attempted: 84,
        percentage: 44.0
      },
      threePointers: {
        made: 10,
        attempted: 29,
        percentage: 34.5
      },
      freeThrows: {
        made: 14,
        attempted: 19,
        percentage: 73.7
      }
    },
    fastBreakPoints: 13,
    pointsInPaint: 42,
    secondChancePoints: 8,
    pointsOffTurnovers: 16,
    biggestLead: 8,
    timeLeading: '14:22'
  },
  homePlayerStats: [],
  awayPlayerStats: [],
  officials: ['John Smith', 'Mary Johnson', 'Robert Williams'],
  leadChanges: 12,
  timesTied: 8
};

export default ApiService;