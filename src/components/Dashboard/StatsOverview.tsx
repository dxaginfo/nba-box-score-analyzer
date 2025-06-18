import { Game, GameStatus } from '@/types';

interface StatsOverviewProps {
  games: Game[];
}

const StatsOverview = ({ games }: StatsOverviewProps) => {
  // Count various game states
  const totalGames = games.length;
  const liveGames = games.filter(game => game.status === GameStatus.LIVE).length;
  const finishedGames = games.filter(game => game.status === GameStatus.FINISHED).length;
  const upcomingGames = games.filter(game => game.status === GameStatus.SCHEDULED).length;
  
  // Calculate average points (for finished games)
  const finishedGamesList = games.filter(game => game.status === GameStatus.FINISHED);
  const totalPoints = finishedGamesList.reduce((total, game) => total + game.homeScore + game.awayScore, 0);
  const avgPoints = finishedGamesList.length > 0 
    ? Math.round(totalPoints / (finishedGamesList.length * 2)) 
    : 0;
  
  // Calculate highest scoring game
  let highestScore = 0;
  let highestScoringGame: Game | null = null;
  
  finishedGamesList.forEach(game => {
    const totalGameScore = game.homeScore + game.awayScore;
    if (totalGameScore > highestScore) {
      highestScore = totalGameScore;
      highestScoringGame = game;
    }
  });

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Games',
      value: totalGames,
      description: 'Games on selected date',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: 'Live Games',
      value: liveGames,
      description: 'Currently playing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      ),
    },
    {
      title: 'Avg. Points',
      value: avgPoints,
      description: 'Per team in finished games',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      title: 'Highest Score',
      value: highestScore,
      description: highestScoringGame 
        ? `${highestScoringGame.awayTeam.abbreviation} vs ${highestScoringGame.homeTeam.abbreviation}`
        : 'No completed games',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-card p-6 flex">
          <div className="w-12 h-12 flex-shrink-0 bg-nba-blue bg-opacity-20 flex items-center justify-center rounded-lg mr-4">
            <div className="text-nba-blue">
              {card.icon}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
            <div className="text-2xl font-bold text-gray-900 my-1">{card.value}</div>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;