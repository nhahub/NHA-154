
import React from 'react';
import { LogoIcon } from './IconComponents';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1A2A4F] text-[#FFF2EF]">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <div 
              className="flex items-center justify-center md:justify-start gap-2 cursor-pointer mb-2"
              onClick={() => onNavigate('home')}
            >
              <LogoIcon className="w-8 h-8 text-[#F7A5A5]" />
              <h2 className="text-3xl font-bold font-cairo text-white">طبيبك</h2>
            </div>
            <p className="text-[#FFDBB6]">Your AI-Powered Health Companion.</p>
          </div>
          <div className="flex space-x-6 font-medium">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} طبيبك. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
