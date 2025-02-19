import React from 'react';

const RiskMetrics: React.FC = () => {
  const metrics = [
    { name: 'Volatility', value: '12.5%', description: 'Annual portfolio volatility' },
    { name: 'Sharpe Ratio', value: '1.8', description: 'Risk-adjusted return measure' },
    { name: 'Beta', value: '0.85', description: 'Market sensitivity' },
    { name: 'Value at Risk', value: '$2,500', description: '95% confidence, 1-day horizon' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">{metric.name}</h3>
          <p className="text-2xl font-bold text-indigo-600">{metric.value}</p>
          <p className="text-sm text-gray-500">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RiskMetrics;