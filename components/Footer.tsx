
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Logo />
        <p className="text-sm text-light-text">
          &copy; {new Date().getFullYear()} DescomplicAI. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
