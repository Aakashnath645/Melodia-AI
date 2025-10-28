
import React, { useState } from 'react';
import type { AppView } from './types';
import Header from './components/Header';
import MusicVisualizer from './components/MusicVisualizer';
import Chatbot from './components/Chatbot';
import ImageGenerator from './components/ImageGenerator';
import TabButton from './components/TabButton';

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
  </svg>
);
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('visualizer');

  const renderContent = () => {
    switch (activeView) {
      case 'visualizer':
        return <MusicVisualizer />;
      case 'chatbot':
        return <Chatbot />;
      case 'imageGenerator':
        return <ImageGenerator />;
      default:
        return <MusicVisualizer />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4">
      <Header />
      <nav className="my-6 w-full max-w-sm mx-auto grid grid-cols-3 gap-3 p-2 bg-gray-800 rounded-xl shadow-lg">
        <TabButton label="Visualizer" icon={<MusicIcon />} isActive={activeView === 'visualizer'} onClick={() => setActiveView('visualizer')} />
        <TabButton label="Chatbot" icon={<ChatIcon />} isActive={activeView === 'chatbot'} onClick={() => setActiveView('chatbot')} />
        <TabButton label="Art" icon={<ImageIcon />} isActive={activeView === 'imageGenerator'} onClick={() => setActiveView('imageGenerator')} />
      </nav>
      <main className="w-full flex-grow flex items-start justify-center">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Created for demonstration purposes.</p>
      </footer>
    </div>
  );
};

export default App;
