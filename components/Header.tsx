import { useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { useMenuManagement } from './useMenuManagement';
import { useAuth } from './useAuth';

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/recuperar-senha';
  const { user, loading, logout } = useAuth();

  // Usar o hook de gerenciamento de menus
  const {
    isMobileMenuOpen,
    isUserMenuOpen,
    mobileMenuRef,
    userMenuRef,
    toggleMobileMenu,
    toggleUserMenu,
    closeAllMenus
  } = useMenuManagement();

  // Scroll suave com offset para o header
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    closeAllMenus();
  }, [closeAllMenus]);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      scrollToSection(sectionId);
    }
    closeAllMenus();
  };

  const handleAuthClick = () => {
    closeAllMenus();
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
  };

  // Foto de perfil padrão ou do usuário
  const getProfilePhoto = () => {
    if (user?.photoURL) {
      return user.photoURL;
    }
    // Foto padrão ou ícone
    return null;
  };

  const getUserInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary flex items-center"
            onClick={closeAllMenus}
          >
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

          {/* Menu Desktop - Centralizado (APENAS na página inicial) */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
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
            </nav>
          )}

          {/* Botões Desktop - Diferentes estados: Logado vs Não logado */}
          {!isAuthPage && !loading && (
            <nav className="hidden md:flex items-center space-x-4">
              {user ? (
                // USUÁRIO LOGADO - Mostrar foto e menu de perfil
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition duration-300"
                  >
                    {getProfilePhoto() ? (
                      <img 
                        src={getProfilePhoto()} 
                        alt="Foto de perfil" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitial()}
                      </div>
                    )}
                    <span className="max-w-32 truncate">
                      {user.displayName || user.email?.split('@')[0] || 'Usuário'}
                    </span>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.displayName || 'Usuário'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link 
                        to="/perfil" 
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        onClick={handleAuthClick}
                      >
                        <FaUser className="mr-2 text-sm" />
                        Meu Perfil
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                      >
                        <FaSignOutAlt className="mr-2 text-sm" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // USUÁRIO NÃO LOGADO - Mostrar dropdown de conta
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary transition duration-300"
                  >
                    <FaUser className="text-lg" />
                    <span>Conta</span>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link 
                        to="/login" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        onClick={handleAuthClick}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/cadastro" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        onClick={handleAuthClick}
                      >
                        Cadastro
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>
          )}

          {/* Menu Mobile Button (APENAS na página inicial) */}
          {!isAuthPage && (
            <div className="md:hidden relative" ref={mobileMenuRef}>
              <button 
                className="text-gray-700 focus:outline-none p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          )}

          {/* Espaço vazio nas páginas de auth para centralizar o logo */}
          {isAuthPage && <div className="w-8"></div>}
        </div>

        {/* Menu Mobile (APENAS na página inicial) */}
        {!isAuthPage && isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white p-4 rounded-lg shadow-lg absolute top-full left-0 right-0 z-40" ref={mobileMenuRef}>
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('problema-solucao')}
                className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
              >
                Desafios & Solução
              </button>
              <button 
                onClick={() => handleNavClick('funcionalidades')}
                className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
              >
                Funcionalidades
              </button>
              <button 
                onClick={() => handleNavClick('equipe')}
                className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
              >
                Equipe
              </button>
              
              <div className="border-t pt-4">
                {user ? (
                  // USUÁRIO LOGADO NO MOBILE
                  <>
                    <div className="px-2 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user.displayName || 'Usuário'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <Link 
                      to="/perfil" 
                      className="block text-gray-700 hover:text-primary transition duration-300 py-2"
                      onClick={handleAuthClick}
                    >
                      Meu Perfil
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-700 hover:text-primary transition duration-300 py-2"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  // USUÁRIO NÃO LOGADO NO MOBILE
                  <>
                    <Link 
                      to="/login" 
                      className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 text-center mb-2"
                      onClick={handleAuthClick}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/cadastro" 
                      className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 text-center"
                      onClick={handleAuthClick}
                    >
                      Cadastro
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
