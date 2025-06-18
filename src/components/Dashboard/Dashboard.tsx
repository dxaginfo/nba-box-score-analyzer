import { useState } from 'react';
import { Link } from 'react-router-dom';
import useData from '@/hooks/useData';
import ApiService from '@/services/api';
import { Game } from '@/types';
import GameCard from './GameCard';
import StatsOverview from './StatsOverview';
import DateSelector from '../common/DateSelector';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorMessage from '../common/ErrorMessage';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Fetch games data
  const [games, { isLoading, error }] = useData<Game[]>(
    () => ApiService.getGames({ dateFrom: selectedDate, dateTo: selectedDate }),
    [selectedDate]
  );
  
  // Handle date change
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NBA Box Score Dashboard</h1>
          <p className="text-gray-600 mt-1">
            View and analyze NBA game statistics
          </p>
        </div>
        
        {/* Date selector */}
        <DateSelector 
          selectedDate={selectedDate} 
          onDateChange={handleDateChange} 
        />
      </div>
      
      {/* Stats overview cards */}
      <StatsOverview games={games || []} />
      
      {/* Games section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Games {selectedDate && `for ${new Date(selectedDate).toLocaleDateString()}`}
          </h2>
          
          <div className="flex space-x-2">
            {/* Filter dropdown would go here */}
            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-nba-blue"
              defaultValue="all"
            >
              <option value="all">All Games</option>
              <option value="live">Live Games</option>
              <option value="finished">Completed</option>
              <option value="scheduled">Upcoming</option>
            </select>
          </div>
        </div>
        
        {/* Loading and error states */}
        {isLoading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        
        {/* Games grid */}
        {!isLoading && !error && games && (
          <>
            {games.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">No games scheduled for this date.</p>
                <button 
                  onClick={() => handleDateChange(new Date().toISOString().split('T')[0])}
                  className="btn btn-primary"
                >
                  View Today's Games
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <Link 
                    key={game.id} 
                    to={`/box-score/${game.id}`}
                    className="block"
                  >
                    <GameCard game={game} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      
      {/* Quick access section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/player-comparison"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center"
          >
            <div className="bg-nba-blue bg-opacity-20 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-nba-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Player Comparison</h3>
              <p className="text-sm text-gray-600">Compare player statistics side by side</p>
            </div>
          </Link>
          
          <Link 
            to="/team-efficiency"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center"
          >
            <div className="bg-nba-blue bg-opacity-20 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-nba-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Team Efficiency</h3>
              <p className="text-sm text-gray-600">Analyze team performance metrics</p>
            </div>
          </Link>
          
          <Link 
            to="/game-flow"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center"
          >
            <div className="bg-nba-blue bg-opacity-20 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-nba-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Game Flow</h3>
              <p className="text-sm text-gray-600">Visualize game momentum and scoring runs</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;