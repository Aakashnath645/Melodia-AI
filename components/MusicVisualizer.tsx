
import React, { useState } from 'react';
import type { MusicTheoryResponse } from '../types';
import { analyzeMusicTheory } from '../services/geminiService';
import Piano from './Piano';

const MusicVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('C Major Scale');
  const [visualization, setVisualization] = useState<MusicTheoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setVisualization(null);

    try {
      const result = await analyzeMusicTheory(prompt);
      setVisualization(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-gray-800 rounded-2xl shadow-2xl flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A minor pentatonic, F# diminished 7th"
          className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : 'Visualize'}
        </button>
      </form>
      
      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}

      <div className="min-h-[300px] flex items-center justify-center">
        {visualization ? (
          <div className="w-full flex flex-col gap-4 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{visualization.name}</h2>
                <p className="text-purple-300 mt-1">{visualization.explanation}</p>
                <p className="text-gray-400 mt-2 text-lg">Notes: <span className="font-mono text-purple-200">{visualization.notes.join(' - ')}</span></p>
            </div>
            <Piano notesToHighlight={visualization.notes} />
          </div>
        ) : !isLoading && (
            <div className="text-center text-gray-400">
                <p>Enter a scale or chord to see it on the piano.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MusicVisualizer;
