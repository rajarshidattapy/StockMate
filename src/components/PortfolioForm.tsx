import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';

interface Position {
  symbol: string;
  quantity: number;
  currentPrice: number;
  costBasis: number;
}

interface Portfolio {
  name: string;
  positions: Position[];
}

const PortfolioForm: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: '',
    positions: [{ symbol: '', quantity: 0, currentPrice: 0, costBasis: 0 }]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addPosition = () => {
    setPortfolio(prev => ({
      ...prev,
      positions: [...prev.positions, { symbol: '', quantity: 0, currentPrice: 0, costBasis: 0 }]
    }));
  };

  const removePosition = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index)
    }));
  };

  const updatePosition = (index: number, field: keyof Position, value: string | number) => {
    setPortfolio(prev => ({
      ...prev,
      positions: prev.positions.map((pos, i) => {
        if (i === index) {
          return { ...pos, [field]: value };
        }
        return pos;
      })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate API call since backend is not available
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage('Portfolio saved successfully! (Demo Mode)');
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create Portfolio</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Portfolio Name
          </label>
          <input
            type="text"
            id="name"
            value={portfolio.name}
            onChange={(e) => setPortfolio(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Positions</h3>
            <button
              type="button"
              onClick={addPosition}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Position
            </button>
          </div>

          {portfolio.positions.map((position, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Symbol</label>
                  <input
                    type="text"
                    value={position.symbol}
                    onChange={(e) => updatePosition(index, 'symbol', e.target.value.toUpperCase())}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                  <input
                    type="number"
                    value={position.quantity}
                    onChange={(e) => updatePosition(index, 'quantity', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Price</label>
                  <input
                    type="number"
                    value={position.currentPrice}
                    onChange={(e) => updatePosition(index, 'currentPrice', parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cost Basis</label>
                  <input
                    type="number"
                    value={position.costBasis}
                    onChange={(e) => updatePosition(index, 'costBasis', parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              {portfolio.positions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePosition(index)}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition-colors"
                >
                  <MinusCircle className="h-4 w-4 mr-1" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' : 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;