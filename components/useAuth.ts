import { useState, useEffect, useCallback } from 'react';

// Interface baseada nas rotas do seu UserService
export interface User {
  id: string | number;
  nome: string;
  email: string;
  telefone?: string;
  imagem?: string; // Base64 vindo do banco
  role?: 'owner' | 'employee' | 'client';
  data_nascimento?: string;
  cpf_usuario?: string;
}

const API_URL = 'http://localhost:2000';
const STORAGE_KEY = '@descomplicai:user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Carregar usuário do LocalStorage ao iniciar
  useEffect(() => {
    const storageUser = localStorage.getItem(STORAGE_KEY);
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
    setLoading(false);
  }, []);

  // 2. Função de Login (POST /auth/login)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      // O UserService costuma retornar { user, token } ou apenas o user
      const userData = data.user || data; 
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Erro no login local:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 3. Função de Logout (POST /auth/logout/:id)
  const logout = useCallback(async () => {
    if (user?.id) {
      try {
        // Chama a rota de logout do seu backend para limpar sessão se necessário
        await fetch(`${API_URL}/auth/logout/${user.id}`, { method: 'POST' });
      } catch (err) {
        console.warn("Erro ao avisar logout ao servidor, limpando localmente...");
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    window.location.href = '/login';
  }, [user]);

  // 4. Função para atualizar os dados (Sync com o Perfil.tsx)
  const refreshUser = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`${API_URL}/users/${user.id}`);
      const updatedUser = await response.json();
      if (response.ok) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error("Erro ao atualizar dados do usuário:", err);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
};