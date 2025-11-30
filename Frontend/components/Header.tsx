
import React from 'react';
import { Page } from '../types';
import { LogoIcon } from './IconComponents';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-[#FFF2EF]/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <LogoIcon className="w-8 h-8 text-[#1A2A4F]" />
          <span className="text-2xl font-bold text-[#1A2A4F] font-cairo">
            طبيبك
          </span>
        </div>
        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-[#1A2A4F] transition-colors font-medium"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="bg-[#F7A5A5] text-white font-bold px-5 py-2 rounded-full hover:bg-[#1A2A4F] transition-all transform hover:scale-105"
          >
            Login / Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
