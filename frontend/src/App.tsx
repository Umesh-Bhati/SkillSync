import { Routes, Route, Navigate } from 'react-router-dom';
import AppPage from './pages/AppPage';
import TrendingAILandingPage from './pages/TrendingAILandingPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TrendingAILandingPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
