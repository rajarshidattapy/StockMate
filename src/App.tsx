import React from 'react';
import { BarChart3, LogOut, User, PlusCircle } from 'lucide-react';
import PortfolioChart from './components/PortfolioChart';
import RiskMetrics from './components/RiskMetrics';
import AIAnalysis from './components/AIAnalysis';
import PortfolioForm from './components/PortfolioForm';
import LoginForm from './components/LoginForm';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Mock API response since backend is not available
const mockAnalysis = `Based on the current portfolio composition and market conditions:

1. Risk Assessment
- Overall risk level is moderate
- Diversification across sectors provides good risk mitigation
- Current volatility is within acceptable ranges

2. Recommendations
- Consider increasing bond allocation for better stability
- Monitor tech sector exposure
- Review position sizes for optimal risk-adjusted returns

3. Market Context
- Current market conditions suggest maintaining defensive positions
- Watch for opportunities in value stocks
- Keep cash reserves for potential market corrections`;

function App() {
  const { isAuthenticated, username, logout } = useAuth();
  const [aiAnalysis, setAiAnalysis] = useState(mockAnalysis);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Since we know the backend is not available, we'll just use the mock data
      setAiAnalysis(mockAnalysis);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                Portfolio Risk Analyzer
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                {showForm ? 'Hide Form' : 'Add Portfolio'}
              </button>
              <ThemeToggle />
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-800 dark:text-gray-200">{username}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <PortfolioChart />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
            <RiskMetrics />
          </div>
        </div>

        <div className="mt-6">
          <AIAnalysis analysis={aiAnalysis} loading={loading} />
        </div>

        {showForm && (
          <div className="mt-6">
            <PortfolioForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;