import { useState, useEffect, useRef } from 'react';

export const useMenuManagement = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Garantir que apenas um menu esteja aberto por vez
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsUserMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isUserMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return {
    isMobileMenuOpen,
    isUserMenuOpen,
    mobileMenuRef,
    userMenuRef,
    toggleMobileMenu,
    toggleUserMenu,
    closeAllMenus
  };
};
