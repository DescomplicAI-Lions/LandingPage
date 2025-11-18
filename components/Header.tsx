import { useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/recuperar-senha';

  // Scroll suave com offset para o header
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura do header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Se não está na página inicial, vai para a página inicial primeiro
      window.location.href = `/#${sectionId}`;
    } else {
      // Se já está na página inicial, faz scroll suave
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + Texto */}
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <img 
              src="/src/assets/Logo-500x500.png" 
              alt="DescomplicAI" 
              className="h-8 w-8 mr-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            DescomplicAI
          </Link>

          {/* Menu Desktop - Centralizado */}
          <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {!isAuthPage && (
              <>
                <button 
                  onClick={() => handleNavClick('problema-solucao')}
                  className="text-gray-700 hover:text-primary transition duration-300"
                >
                  Desafios & Solução
                </button>
                <button 
                  onClick={() => handleNavClick('funcionalidades')}
                  className="text-gray-700 hover:text-primary transition duration-300"
                >
                  Funcionalidades
                </button>
                <button 
                  onClick={() => handleNavClick('equipe')}
                  className="text-gray-700 hover:text-primary transition duration-300"
                >
                  Equipe
                </button>
              </>
            )}
          </nav>

          {/* Botões Login/Cadastro - À direita */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Login
            </Link>
            <Link 
              to="/cadastro" 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300"
            >
              Cadastro
            </Link>
          </nav>

          {/* Menu Mobile Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white p-4 rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4">
              {!isAuthPage && (
                <>
                  <button 
                    onClick={() => handleNavClick('problema-solucao')}
                    className="text-gray-700 hover:text-primary transition duration-300 text-left"
                  >
                    Desafios & Solução
                  </button>
                  <button 
                    onClick={() => handleNavClick('funcionalidades')}
                    className="text-gray-700 hover:text-primary transition duration-300 text-left"
                  >
                    Funcionalidades
                  </button>
                  <button 
                    onClick={() => handleNavClick('equipe')}
                    className="text-gray-700 hover:text-primary transition duration-300 text-left"
                  >
                    Equipe
                  </button>
                </>
              )}
              
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/cadastro" 
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastro
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
