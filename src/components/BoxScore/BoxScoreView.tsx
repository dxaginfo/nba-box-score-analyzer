import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useData from '@/hooks/useData';
import ApiService from '@/services/api';
import { BoxScore } from '@/types';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';
import TeamStats from './TeamStats';
import PlayerStatsTable from './PlayerStatsTable';
import GameSummary from './GameSummary';

const BoxScoreView = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [activeTab, setActiveTab] = useState<'summary' | 'team-stats' | 'player-stats'>('summary');
  
  // Fetch box score data
  const [boxScore, { isLoading, error }] = useData<BoxScore>(
    () => ApiService.getBoxScore(gameId || ''),
    [gameId]
  );

  // Handle retry on error
  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingIndicator message="Loading box score data..." />;
  }

  if (error || !boxScore) {
    return (
      <ErrorMessage 
        message={error || "Failed to load box score data"} 
        retry={handleRetry} 
      />
    );
  }

  // Helper to render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return <GameSummary boxScore={boxScore} />;
      case 'team-stats':
        return <TeamStats boxScore={boxScore} />;
      case 'player-stats':
        return (
          <div className="space-y-8">
            <PlayerStatsTable 
              playerStats={boxScore.homePlayerStats} 
              team={boxScore.homeTeamStats.team} 
            />
            <PlayerStatsTable 
              playerStats={boxScore.awayPlayerStats} 
              team={boxScore.awayTeamStats.team} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center text-nba-blue hover:text-blue-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      {/* Game header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <img 
              src={boxScore.awayTeamStats.team.logo} 
              alt={boxScore.awayTeamStats.team.name} 
              className="w-16 h-16 object-contain"
            />
            <div className="mx-4">
              <h2 className="text-2xl font-bold">
                {boxScore.awayTeamStats.team.city} {boxScore.awayTeamStats.team.name}
                <span className="mx-3 text-gray-400">@</span>
                {boxScore.homeTeamStats.team.city} {boxScore.homeTeamStats.team.name}
              </h2>
              <p className="text-gray-600">
                {new Date(boxScore.game.date).toLocaleDateString()} | {boxScore.game.arena.name}, {boxScore.game.arena.city}
              </p>
            </div>
            <img 
              src={boxScore.homeTeamStats.team.logo} 
              alt={boxScore.homeTeamStats.team.name} 
              className="w-16 h-16 object-contain"
            />
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-3xl font-bold">
            <span className={boxScore.game.awayScore > boxScore.game.homeScore ? 'text-nba-blue' : ''}>
              {boxScore.game.awayScore}
            </span>
            <span className="text-gray-400">-</span>
            <span className={boxScore.game.homeScore > boxScore.game.awayScore ? 'text-nba-blue' : ''}>
              {boxScore.game.homeScore}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`py-4 px-6 font-medium ${
                activeTab === 'summary'
                  ? 'text-nba-blue border-b-2 border-nba-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Game Summary
            </button>
            <button
              className={`py-4 px-6 font-medium ${
                activeTab === 'team-stats'
                  ? 'text-nba-blue border-b-2 border-nba-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('team-stats')}
            >
              Team Stats
            </button>
            <button
              className={`py-4 px-6 font-medium ${
                activeTab === 'player-stats'
                  ? 'text-nba-blue border-b-2 border-nba-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('player-stats')}
            >
              Player Stats
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Game meta information */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">Game Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Officials:</span>{' '}
              {boxScore.officials.join(', ')}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Lead Changes:</span>{' '}
              {boxScore.leadChanges}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Times Tied:</span>{' '}
              {boxScore.timesTied}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Attendance:</span>{' '}
              18,704
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Duration:</span>{' '}
              2:14
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxScoreView;