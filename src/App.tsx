import { Routes, Route } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import Dashboard from '@components/Dashboard/Dashboard';
import BoxScoreView from '@components/BoxScore/BoxScoreView';
import PlayerComparison from '@components/PlayerCards/PlayerComparison';
import TeamEfficiency from '@components/Charts/TeamEfficiency';
import GameFlow from '@components/Charts/GameFlow';
import NotFound from '@components/Layout/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/box-score/:gameId" element={<BoxScoreView />} />
        <Route path="/player-comparison" element={<PlayerComparison />} />
        <Route path="/team-efficiency" element={<TeamEfficiency />} />
        <Route path="/game-flow" element={<GameFlow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;