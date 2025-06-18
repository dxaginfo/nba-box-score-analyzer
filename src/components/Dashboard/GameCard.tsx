import { Game, GameStatus } from '@/types';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  // Format game time or status
  const getGameStatusDisplay = () => {
    switch (game.status) {
      case GameStatus.LIVE:
        return (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            <span>
              {game.period > 4 ? 'OT' : `Q${game.period}`} {game.clock || ''}
            </span>
          </div>
        );
      case GameStatus.FINISHED:
        return 'Final';
      case GameStatus.SCHEDULED:
        const gameDate = new Date(game.date);
        return gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      default:
        return game.status.charAt(0).toUpperCase() + game.status.slice(1);
    }
  };

  // Determine if the game is live, upcoming, or finished
  const isLive = game.status === GameStatus.LIVE;
  const isFinished = game.status === GameStatus.FINISHED;
  const isUpcoming = game.status === GameStatus.SCHEDULED;

  // Calculate winner for finished games
  const homeWon = isFinished && game.homeScore > game.awayScore;
  const awayWon = isFinished && game.awayScore > game.homeScore;

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Game status indicator */}
      <div className="flex justify-between items-center mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isLive ? 'bg-red-100 text-red-800' : 
          isFinished ? 'bg-gray-100 text-gray-800' :
          'bg-green-100 text-green-800'
        }`}>
          {getGameStatusDisplay()}
        </div>
        
        <div className="text-xs text-gray-500">
          {new Date(game.date).toLocaleDateString()}
        </div>
      </div>
      
      {/* Teams and scores */}
      <div className="space-y-4">
        {/* Away team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={game.awayTeam.logo} 
              alt={`${game.awayTeam.city} ${game.awayTeam.name}`}
              className="w-10 h-10 mr-3"
            />
            <div>
              <div className="font-medium text-gray-900">
                {game.awayTeam.city} {game.awayTeam.name}
              </div>
              <div className="text-xs text-gray-500">
                {game.awayTeam.conference} Conference
              </div>
            </div>
          </div>
          
          <div className={`text-2xl font-bold ${awayWon ? 'text-nba-blue' : 'text-gray-700'}`}>
            {(isLive || isFinished) ? game.awayScore : '-'}
          </div>
        </div>
        
        {/* Home team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={game.homeTeam.logo} 
              alt={`${game.homeTeam.city} ${game.homeTeam.name}`}
              className="w-10 h-10 mr-3"
            />
            <div>
              <div className="font-medium text-gray-900">
                {game.homeTeam.city} {game.homeTeam.name}
              </div>
              <div className="text-xs text-gray-500">
                {game.homeTeam.conference} Conference
              </div>
            </div>
          </div>
          
          <div className={`text-2xl font-bold ${homeWon ? 'text-nba-blue' : 'text-gray-700'}`}>
            {(isLive || isFinished) ? game.homeScore : '-'}
          </div>
        </div>
      </div>
      
      {/* Game venue */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
        {game.arena.name}, {game.arena.city}
      </div>
    </div>
  );
};

export default GameCard;