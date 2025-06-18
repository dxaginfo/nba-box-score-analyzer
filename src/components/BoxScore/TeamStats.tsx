import { BoxScore } from '@/types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TeamStatsProps {
  boxScore: BoxScore;
}

const TeamStats = ({ boxScore }: TeamStatsProps) => {
  const { homeTeamStats, awayTeamStats } = boxScore;
  
  // Prepare data for radar chart
  const radarData = {
    labels: [
      'Points', 
      'Rebounds', 
      'Assists', 
      'Steals', 
      'Blocks', 
      'FG%', 
      '3P%'
    ],
    datasets: [
      {
        label: homeTeamStats.team.name,
        data: [
          homeTeamStats.points,
          homeTeamStats.rebounds.total,
          homeTeamStats.assists,
          homeTeamStats.steals,
          homeTeamStats.blocks,
          homeTeamStats.shooting.fieldGoals.percentage,
          homeTeamStats.shooting.threePointers.percentage,
        ],
        backgroundColor: `${homeTeamStats.team.primaryColor}33`, // With alpha
        borderColor: homeTeamStats.team.primaryColor,
        borderWidth: 2,
        pointBackgroundColor: homeTeamStats.team.primaryColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: homeTeamStats.team.primaryColor,
      },
      {
        label: awayTeamStats.team.name,
        data: [
          awayTeamStats.points,
          awayTeamStats.rebounds.total,
          awayTeamStats.assists,
          awayTeamStats.steals,
          awayTeamStats.blocks,
          awayTeamStats.shooting.fieldGoals.percentage,
          awayTeamStats.shooting.threePointers.percentage,
        ],
        backgroundColor: `${awayTeamStats.team.primaryColor}33`, // With alpha
        borderColor: awayTeamStats.team.primaryColor,
        borderWidth: 2,
        pointBackgroundColor: awayTeamStats.team.primaryColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: awayTeamStats.team.primaryColor,
      },
    ],
  };

  // Chart options
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
      },
    },
  };

  // Team stats categories for table display
  const statCategories = [
    { label: 'Points', home: homeTeamStats.points, away: awayTeamStats.points },
    { label: 'Rebounds (Off)', home: homeTeamStats.rebounds.offensive, away: awayTeamStats.rebounds.offensive },
    { label: 'Rebounds (Def)', home: homeTeamStats.rebounds.defensive, away: awayTeamStats.rebounds.defensive },
    { label: 'Rebounds (Total)', home: homeTeamStats.rebounds.total, away: awayTeamStats.rebounds.total },
    { label: 'Assists', home: homeTeamStats.assists, away: awayTeamStats.assists },
    { label: 'Steals', home: homeTeamStats.steals, away: awayTeamStats.steals },
    { label: 'Blocks', home: homeTeamStats.blocks, away: awayTeamStats.blocks },
    { label: 'Turnovers', home: homeTeamStats.turnovers, away: awayTeamStats.turnovers },
    { label: 'Fouls', home: homeTeamStats.fouls, away: awayTeamStats.fouls },
    { label: 'FG Made-Att', home: `${homeTeamStats.shooting.fieldGoals.made}-${homeTeamStats.shooting.fieldGoals.attempted}`, away: `${awayTeamStats.shooting.fieldGoals.made}-${awayTeamStats.shooting.fieldGoals.attempted}`, isText: true },
    { label: 'FG%', home: `${homeTeamStats.shooting.fieldGoals.percentage.toFixed(1)}%`, away: `${awayTeamStats.shooting.fieldGoals.percentage.toFixed(1)}%`, isText: true },
    { label: '3P Made-Att', home: `${homeTeamStats.shooting.threePointers.made}-${homeTeamStats.shooting.threePointers.attempted}`, away: `${awayTeamStats.shooting.threePointers.made}-${awayTeamStats.shooting.threePointers.attempted}`, isText: true },
    { label: '3P%', home: `${homeTeamStats.shooting.threePointers.percentage.toFixed(1)}%`, away: `${awayTeamStats.shooting.threePointers.percentage.toFixed(1)}%`, isText: true },
    { label: 'FT Made-Att', home: `${homeTeamStats.shooting.freeThrows.made}-${homeTeamStats.shooting.freeThrows.attempted}`, away: `${awayTeamStats.shooting.freeThrows.made}-${awayTeamStats.shooting.freeThrows.attempted}`, isText: true },
    { label: 'FT%', home: `${homeTeamStats.shooting.freeThrows.percentage.toFixed(1)}%`, away: `${awayTeamStats.shooting.freeThrows.percentage.toFixed(1)}%`, isText: true },
    { label: 'Fast Break Points', home: homeTeamStats.fastBreakPoints, away: awayTeamStats.fastBreakPoints },
    { label: 'Points in Paint', home: homeTeamStats.pointsInPaint, away: awayTeamStats.pointsInPaint },
    { label: '2nd Chance Points', home: homeTeamStats.secondChancePoints, away: awayTeamStats.secondChancePoints },
    { label: 'Points Off Turnovers', home: homeTeamStats.pointsOffTurnovers, away: awayTeamStats.pointsOffTurnovers },
    { label: 'Biggest Lead', home: homeTeamStats.biggestLead, away: awayTeamStats.biggestLead },
    { label: 'Time Leading', home: homeTeamStats.timeLeading, away: awayTeamStats.timeLeading, isText: true },
  ];

  return (
    <div className="space-y-8">
      {/* Radar chart for visual comparison */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Team Performance Comparison</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[400px] w-full">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      </div>
      
      {/* Detailed stats table */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Detailed Team Statistics</h3>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistic
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {homeTeamStats.team.abbreviation}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {awayTeamStats.team.abbreviation}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statCategories.map((stat, index) => {
                const isHomeHigher = !stat.isText && stat.home > stat.away;
                const isAwayHigher = !stat.isText && stat.away > stat.home;
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.label}
                    </td>
                    <td className={`px-6 py-3 whitespace-nowrap text-sm text-right ${isHomeHigher ? 'font-bold text-green-600' : ''}`}>
                      {stat.home}
                    </td>
                    <td className={`px-6 py-3 whitespace-nowrap text-sm text-right ${isAwayHigher ? 'font-bold text-green-600' : ''}`}>
                      {stat.away}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;