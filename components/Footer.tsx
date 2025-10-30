import React from 'react';
import { FaLinkedin, FaPhone, FaInstagram, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo'; // Assuming Logo component exists

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Logo />
          <p className="text-sm text-light-text text-center md:text-left">
            &copy; {new Date().getFullYear()} DescomplicAI. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Entre em Contato</h3>
          <div className="flex items-center space-x-2 text-light-text">
            <FaPhone />
            <span>+55 (42) 99999-9999</span>
          </div>
          <div className="flex items-center space-x-2 text-light-text">
            <FaMapMarkerAlt />
            <span>Rua da Inovação, 123, Ponta Grossa - PR, Brasil</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="https://youtu.be/dQw4w9WgXcQ?si=i4DrY-hO1FtgCor8" target="_blank" rel="noopener noreferrer" className="text-light-text hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
            <a href="https://youtu.be/dQw4w9WgXcQ?si=i4DrY-hO1FtgCor8" target="_blank" rel="noopener noreferrer" className="text-light-text hover:text-pink-600">
              <FaInstagram size={24} />
            </a>
            <a href="https://youtu.be/dQw4w9WgXcQ?si=i4DrY-hO1FtgCor8" target="_blank" rel="noopener noreferrer" className="text-light-text hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;