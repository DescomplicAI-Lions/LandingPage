import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaChevronDown, FaTimes, FaBars } from "react-icons/fa";
import Logo from "./Logo";

type StoredUser = {
  nome: string;
  email: string;
  avatar?: string;
};

const Header: React.FC = () => {
  const [user, setUser] = useState<StoredUser | null>(null);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/recuperar-senha";

  // Carrega user do localStorage + escuta evento customizado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserUpdate = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("userLoginUpdate", handleUserUpdate as EventListener);
    return () => window.removeEventListener("userLoginUpdate", handleUserUpdate as EventListener);
  }, []);

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = useCallback(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const logout = useCallback(() => {
    // ajuste aqui se você tiver um auth real (token, etc.)
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoginUpdate"));
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeAllMenus();
    navigate("/login");
  }, [logout, closeAllMenus, navigate]);

  const getUserInitial = useCallback(() => {
    if (user?.nome) return user.nome.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  }, [user]);

  // Navegar/scroll para seção
  const scrollToSection = useCallback(
    (sectionId: string) => {
      closeAllMenus();

      if (location.pathname !== "/") {
        navigate(`/#${sectionId}`);
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    },
    [closeAllMenus, location.pathname, navigate]
  );

  const goDashboard = useCallback(() => {
    // Se for produção depois, troca localhost por sua URL real
    window.location.href =
      "http://localhost:3000/login?name=" +
      encodeURIComponent(user?.nome ?? "") +
      "&email=" +
      encodeURIComponent(user?.email ?? "");
  }, [user]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("problema")}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Desafios &amp; Solução
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

          {/* ÁREA DIREITA (DESKTOP) */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-3"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <img
                    src={user.avatar || "https://i.pravatar.cc/40"}
                    alt="Avatar do usuário"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary object-cover"
                  />
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-800 truncate">{user.nome}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={goDashboard}
                      className="w-full text-left px-4 py-2 text-primary font-bold hover:bg-gray-100"
                    >
                      Ir para o Dashboard
                    </button>

                    <Link
                      to="/minha-conta"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={closeAllMenus}
                    >
                      Minha Conta
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaUser className="text-lg" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/cadastro"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-200"
                >
                  Cadastro
                </Link>
              </div>
            )}
          </div>

          {/* MENU MOBILE BUTTON (não aparece em páginas de auth) */}
          {!isAuthPage ? (
            <div className="md:hidden relative" ref={mobileMenuRef}>
              <button
                className="text-gray-700 focus:outline-none p-2"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              {/* MENU MOBILE */}
              {mobileMenuOpen && (
                <div className="md:hidden mt-4 bg-white p-4 rounded-lg shadow-lg absolute top-full left-0 right-0 z-40">
                  <nav className="flex flex-col space-y-4">
                    <button
                      onClick={() => scrollToSection("problema")}
                      className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
                    >
                      Desafios &amp; Solução
                    </button>
                    <button
                      onClick={() => scrollToSection("features")}
                      className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
                    >
                      Funcionalidades
                    </button>
                    <button
                      onClick={() => scrollToSection("equipe")}
                      className="text-gray-700 hover:text-primary transition duration-300 text-left py-2"
                    >
                      Equipe
                    </button>

                    <div className="border-t pt-4">
                      {user ? (
                        <>
                          <div className="px-2 py-3 border-b border-gray-100 mb-2">
                            <p className="text-sm font-medium text-gray-900">
                              {user.nome || `Usuário ${getUserInitial()}`}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>

                          <Link
                            to="/minha-conta"
                            className="block text-gray-700 hover:text-primary transition duration-300 py-2"
                            onClick={closeAllMenus}
                          >
                            Minha Conta
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="block w-full text-left text-gray-700 hover:text-primary transition duration-300 py-2"
                          >
                            Sair
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 text-center mb-2"
                            onClick={closeAllMenus}
                          >
                            Login
                          </Link>
                          <Link
                            to="/cadastro"
                            className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 text-center"
                            onClick={closeAllMenus}
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
          ) : (
            // Espaço vazio nas páginas de auth para centralizar o logo
            <div className="w-8 md:hidden" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
