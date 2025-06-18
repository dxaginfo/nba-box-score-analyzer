import { BoxScore } from '@/types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GameSummaryProps {
  boxScore: BoxScore;
}

const GameSummary = ({ boxScore }: GameSummaryProps) => {
  const { homeTeamStats, awayTeamStats } = boxScore;
  
  // Quarter-by-quarter scoring
  const scoresByQuarter = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: homeTeamStats.team.name,
        data: homeTeamStats.pointsByQuarter,
        backgroundColor: homeTeamStats.team.primaryColor,
        borderColor: homeTeamStats.team.primaryColor,
        borderWidth: 1,
      },
      {
        label: awayTeamStats.team.name,
        data: awayTeamStats.pointsByQuarter,
        backgroundColor: awayTeamStats.team.primaryColor,
        borderColor: awayTeamStats.team.primaryColor,
        borderWidth: 1,
      },
    ],
  };

  // Calculate shooting statistics
  const shootingStats = {
    labels: ['FG%', '3P%', 'FT%'],
    datasets: [
      {
        label: homeTeamStats.team.name,
        data: [
          homeTeamStats.shooting.fieldGoals.percentage,
          homeTeamStats.shooting.threePointers.percentage,
          homeTeamStats.shooting.freeThrows.percentage,
        ],
        backgroundColor: homeTeamStats.team.primaryColor,
        borderColor: homeTeamStats.team.primaryColor,
        borderWidth: 1,
      },
      {
        label: awayTeamStats.team.name,
        data: [
          awayTeamStats.shooting.fieldGoals.percentage,
          awayTeamStats.shooting.threePointers.percentage,
          awayTeamStats.shooting.freeThrows.percentage,
        ],
        backgroundColor: awayTeamStats.team.primaryColor,
        borderColor: awayTeamStats.team.primaryColor,
        borderWidth: 1,
      },
    ],
  };

  // Options for charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculate game statistics for comparison
  const statCategories = [
    { label: 'Rebounds', home: homeTeamStats.rebounds.total, away: awayTeamStats.rebounds.total },
    { label: 'Assists', home: homeTeamStats.assists, away: awayTeamStats.assists },
    { label: 'Steals', home: homeTeamStats.steals, away: awayTeamStats.steals },
    { label: 'Blocks', home: homeTeamStats.blocks, away: awayTeamStats.blocks },
    { label: 'Turnovers', home: homeTeamStats.turnovers, away: awayTeamStats.turnovers, inverted: true },
    { label: 'Fast Break Pts', home: homeTeamStats.fastBreakPoints, away: awayTeamStats.fastBreakPoints },
    { label: 'Points in Paint', home: homeTeamStats.pointsInPaint, away: awayTeamStats.pointsInPaint },
    { label: '2nd Chance Pts', home: homeTeamStats.secondChancePoints, away: awayTeamStats.secondChancePoints },
    { label: 'Pts Off Turnovers', home: homeTeamStats.pointsOffTurnovers, away: awayTeamStats.pointsOffTurnovers },
  ];

  return (
    <div className="space-y-8">
      {/* Quarter-by-quarter scoring */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Quarter-by-Quarter Scoring</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-64">
            <Bar data={scoresByQuarter} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Shooting percentages */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Shooting Percentages</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-64">
            <Bar data={shootingStats} options={chartOptions} />
          </div>
        </div>
        
        {/* Shooting details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold mb-2">{homeTeamStats.team.name} Shooting</h4>
            <div className="space-y-2">
              <p>
                Field Goals: {homeTeamStats.shooting.fieldGoals.made}/{homeTeamStats.shooting.fieldGoals.attempted} ({homeTeamStats.shooting.fieldGoals.percentage.toFixed(1)}%)
              </p>
              <p>
                3-Pointers: {homeTeamStats.shooting.threePointers.made}/{homeTeamStats.shooting.threePointers.attempted} ({homeTeamStats.shooting.threePointers.percentage.toFixed(1)}%)
              </p>
              <p>
                Free Throws: {homeTeamStats.shooting.freeThrows.made}/{homeTeamStats.shooting.freeThrows.attempted} ({homeTeamStats.shooting.freeThrows.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold mb-2">{awayTeamStats.team.name} Shooting</h4>
            <div className="space-y-2">
              <p>
                Field Goals: {awayTeamStats.shooting.fieldGoals.made}/{awayTeamStats.shooting.fieldGoals.attempted} ({awayTeamStats.shooting.fieldGoals.percentage.toFixed(1)}%)
              </p>
              <p>
                3-Pointers: {awayTeamStats.shooting.threePointers.made}/{awayTeamStats.shooting.threePointers.attempted} ({awayTeamStats.shooting.threePointers.percentage.toFixed(1)}%)
              </p>
              <p>
                Free Throws: {awayTeamStats.shooting.freeThrows.made}/{awayTeamStats.shooting.freeThrows.attempted} ({awayTeamStats.shooting.freeThrows.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game statistics comparison */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Game Statistics</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-2">
            {statCategories.map((stat, index) => {
              const total = stat.home + stat.away;
              const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
              const awayPercent = total > 0 ? (stat.away / total) * 100 : 50;
              const isHomeHigher = stat.inverted ? stat.home < stat.away : stat.home > stat.away;
              const isAwayHigher = stat.inverted ? stat.home > stat.away : stat.home < stat.away;
              
              return (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{stat.home}</span>
                    <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
                    <span className="font-medium">{stat.away}</span>
                  </div>
                  <div className="flex h-5 rounded-full overflow-hidden">
                    <div
                      className={`flex items-center justify-end px-2 text-xs text-white ${isHomeHigher ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${homePercent}%` }}
                    ></div>
                    <div
                      className={`flex items-center justify-start px-2 text-xs text-white ${isAwayHigher ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${awayPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{homeTeamStats.team.abbreviation}</span>
                    <span>{awayTeamStats.team.abbreviation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSummary;