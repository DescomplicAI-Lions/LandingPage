
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <nav className="hidden md:flex space-x-8">
            <a href="#problema" className="text-gray-600 hover:text-primary transition-colors duration-200">A Solução</a>
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors duration-200">Nossas Funcionalidades</a>
            <a href="#equipe" className="text-gray-600 hover:text-primary transition-colors duration-200">Nossa Equipe</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
