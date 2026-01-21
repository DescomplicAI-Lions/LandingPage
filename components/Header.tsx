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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-primary-hover transition"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="border border-primary text-primary px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition"
              >
                Cadastrar-se
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;