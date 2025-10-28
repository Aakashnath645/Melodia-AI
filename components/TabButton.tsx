import React from 'react';

interface TabButtonProps {
  label: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve namespace issue.
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex items-center justify-center sm:justify-start gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900";
  const activeClasses = "bg-purple-600 text-white shadow-lg scale-105";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default TabButton;