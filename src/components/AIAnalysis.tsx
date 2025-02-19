import React from 'react';
import { Brain } from 'lucide-react';

interface AIAnalysisProps {
  analysis: string;
  loading: boolean;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis, loading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">AI Risk Analysis</h2>
      </div>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {analysis.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300">
                {paragraph.startsWith('-') ? (
                  <span className="inline-block ml-4">{paragraph}</span>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;