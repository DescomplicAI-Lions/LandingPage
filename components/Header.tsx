import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ nome: string; email: string; avatar?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userLoginUpdate", handleUserUpdate);
    return () => window.removeEventListener("userLoginUpdate", handleUserUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Função para navegar até a seção mesmo vindo de outras páginas
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // Se não estiver na home, vai para a home com o hash
      navigate(`/#${sectionId}`);
    } else {
      // Se já estiver na home, apenas rola
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("problema")}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Desafios & Solução
            </button>
            <button 
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Funcionalidades
            </button>
            <button 
              onClick={() => scrollToSection("equipe")}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Equipe
            </button>
          </nav>

          {user ? (
            <div className="relative" ref={menuRef}>
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="Avatar do usuário"
                className="w-12 h-12 rounded-full cursor-pointer border-2 border-primary object-cover"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-800 truncate">{user.nome}</p>
                  </div>

                  {/* Botão para ir ao Dashboard */}
                  <button
                    onClick={() => window.location.href = "http://localhost:3000/login?name=" + encodeURIComponent(user.nome) + "&email=" + user.email}
                    className="w-full text-left px-4 py-2 text-primary font-bold hover:bg-gray-100"
                  >
                    Ir para o Dashboard
                  </button>

                  <Link
                    to="/minha-conta"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Minha Conta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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