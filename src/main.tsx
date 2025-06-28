import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ React Router imports
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import AnalyzerPage from './pages/AnalyzerPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Router wraps all routes */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
