import { PlayerStats, Team } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PlayerStatsTableProps {
  playerStats: PlayerStats[];
  team: Team;
}

const PlayerStatsTable = ({ playerStats, team }: PlayerStatsTableProps) => {
  const [sortBy, setSortBy] = useState<keyof PlayerStats>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for player stats since we don't have it in the mock data
  const mockPlayerStats: PlayerStats[] = [
    {
      player: {
        id: '1',
        firstName: 'LeBron',
        lastName: 'James',
        jerseyNumber: '23',
        position: 'F',
        headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
      },
      starter: true,
      minutes: '36:42',
      points: 27,
      rebounds: {
        offensive: 2,
        defensive: 7,
        total: 9
      },
      assists: 7,
      steals: 1,
      blocks: 1,
      turnovers: 4,
      fouls: 2,
      plusMinus: 12,
      shooting: {
        fieldGoals: {
          made: 11,
          attempted: 20,
          percentage: 55.0
        },
        threePointers: {
          made: 2,
          attempted: 6,
          percentage: 33.3
        },
        freeThrows: {
          made: 3,
          attempted: 4,
          percentage: 75.0
        }
      }
    },
    {
      player: {
        id: '2',
        firstName: 'Anthony',
        lastName: 'Davis',
        jerseyNumber: '3',
        position: 'F-C',
        headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png'
      },
      starter: true,
      minutes: '34:18',
      points: 21,
      rebounds: {
        offensive: 4,
        defensive: 8,
        total: 12
      },
      assists: 3,
      steals: 2,
      blocks: 4,
      turnovers: 1,
      fouls: 3,
      plusMinus: 15,
      shooting: {
        fieldGoals: {
          made: 8,
          attempted: 14,
          percentage: 57.1
        },
        threePointers: {
          made: 1,
          attempted: 2,
          percentage: 50.0
        },
        freeThrows: {
          made: 4,
          attempted: 5,
          percentage: 80.0
        }
      }
    },
    {
      player: {
        id: '3',
        firstName: 'D'Angelo',
        lastName: 'Russell',
        jerseyNumber: '1',
        position: 'G',
        headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1626156.png'
      },
      starter: true,
      minutes: '32:56',
      points: 18,
      rebounds: {
        offensive: 0,
        defensive: 3,
        total: 3
      },
      assists: 8,
      steals: 1,
      blocks: 0,
      turnovers: 2,
      fouls: 2,
      plusMinus: 7,
      shooting: {
        fieldGoals: {
          made: 7,
          attempted: 15,
          percentage: 46.7
        },
        threePointers: {
          made: 3,
          attempted: 7,
          percentage: 42.9
        },
        freeThrows: {
          made: 1,
          attempted: 2,
          percentage: 50.0
        }
      }
    }
  ];
  
  // Use mock data if no real data is provided
  const stats = playerStats.length > 0 ? playerStats : mockPlayerStats;
  
  // Handle sorting
  const handleSort = (key: keyof PlayerStats) => {
    if (sortBy === key) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to descending
      setSortBy(key);
      setSortDirection('desc');
    }
  };
  
  // Sort the player stats
  const sortedStats = [...stats].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    // Handle nested objects
    if (sortBy === 'rebounds') {
      aValue = a.rebounds.total;
      bValue = b.rebounds.total;
    } else if (sortBy === 'shooting') {
      aValue = a.shooting.fieldGoals.percentage;
      bValue = b.shooting.fieldGoals.percentage;
    }
    
    if (aValue === bValue) return 0;
    
    // Sort based on direction
    const sortResult = aValue < bValue ? -1 : 1;
    return sortDirection === 'asc' ? sortResult : -sortResult;
  });

  // Helper to render sort indicator
  const renderSortIndicator = (key: keyof PlayerStats) => {
    if (sortBy !== key) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img 
            src={team.logo} 
            alt={team.name} 
            className="w-10 h-10 mr-3"
          />
          <h3 className="text-xl font-semibold">{team.city} {team.name} Player Stats</h3>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('points')}
              >
                PTS{renderSortIndicator('points')}
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('rebounds')}
              >
                REB{renderSortIndicator('rebounds')}
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('assists')}
              >
                AST{renderSortIndicator('assists')}
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('steals')}
              >
                STL{renderSortIndicator('steals')}
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('blocks')}
              >
                BLK{renderSortIndicator('blocks')}
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                FG
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                3P
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                FT
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('plusMinus')}
              >
                +/-{renderSortIndicator('plusMinus')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStats.map((stat, index) => (
              <tr key={index} className={stat.starter ? 'font-medium' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link 
                    to={`/player/${stat.player.id}`}
                    className="flex items-center group"
                  >
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={stat.player.headshot} 
                        alt={`${stat.player.firstName} ${stat.player.lastName}`} 
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-nba-blue">
                        {stat.player.firstName} {stat.player.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        #{stat.player.jerseyNumber} | {stat.player.position}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.minutes}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium">
                  {stat.points}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.rebounds.total}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.assists}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.steals}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.blocks}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.shooting.fieldGoals.made}-{stat.shooting.fieldGoals.attempted}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.shooting.threePointers.made}-{stat.shooting.threePointers.attempted}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {stat.shooting.freeThrows.made}-{stat.shooting.freeThrows.attempted}
                </td>
                <td className={`px-4 py-3 whitespace-nowrap text-sm text-center font-medium ${
                  stat.plusMinus > 0 ? 'text-green-600' : 
                  stat.plusMinus < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.plusMinus > 0 ? '+' : ''}{stat.plusMinus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStatsTable;