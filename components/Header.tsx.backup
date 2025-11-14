import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ nome: string; email: string; avatar?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Menu Mobile Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#problema" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Desafios & Solução
            </a>
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Funcionalidades
            </a>
            <a href="#equipe" className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Equipe
            </a>
          </nav>

          {user ? (
            <div className="hidden md:block relative" ref={menuRef}>
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="Avatar do usuário"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-800 truncate">{user.nome}</p>
                  </div>

                  <Link
                    to="/minha-conta"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Minha Conta
                  </Link>
                  <Link
                    to="/configuracoes"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 md:px-5 md:py-2 rounded-xl hover:bg-primary-hover transition text-sm md:text-base"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="border border-primary text-primary px-4 py-2 md:px-5 md:py-2 rounded-xl hover:bg-primary hover:text-white transition text-sm md:text-base"
              >
                Cadastrar-se
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#problema" className="text-gray-600 hover:text-primary transition-colors duration-200">
                Desafios & Solução
              </a>
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors duration-200">
                Funcionalidades
              </a>
              <a href="#equipe" className="text-gray-600 hover:text-primary transition-colors duration-200">
                Equipe
              </a>
              
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={user.avatar || "https://i.pravatar.cc/40"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-800">{user.nome}</span>
                  </div>
                  <Link to="/minha-conta" className="block py-2 text-gray-700">Minha Conta</Link>
                  <Link to="/configuracoes" className="block py-2 text-gray-700">Configurações</Link>
                  <button onClick={handleLogout} className="block py-2 text-red-600">Sair</button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition text-center"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/cadastro"
                    className="border border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition text-center"
                  >
                    Cadastrar-se
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
