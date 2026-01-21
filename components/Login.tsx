import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../src/services/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const DASHBOARD_URL = "http://localhost:3000";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userName = encodeURIComponent(user.displayName || 'Usuário');
      const userEmail = encodeURIComponent(user.email || '');

      window.location.href = `${DASHBOARD_URL}/login?name=${userName}&email=${userEmail}`;
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userName = encodeURIComponent(user.displayName || 'Usuário');
      const userEmail = encodeURIComponent(user.email || '');

      window.location.href = `${DASHBOARD_URL}/login?name=${userName}&email=${userEmail}`;
    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao fazer login com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-text">Entre na sua conta</h2>
        </div>
        
        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all"
          >
            <img className="h-5 w-5 mr-2" src="https://www.google.com/favicon.ico" alt="Google" />
            {loading ? 'Entrando...' : 'Entrar com Google'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-light-bg text-gray-500">Ou</span></div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          {/* Trocado Stack por div com gap-4 do Tailwind */}
          <div className="flex flex-col gap-4">
            <input
              type="email" required placeholder="Seu email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <input
              type="password" required placeholder="Sua senha" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <button
              type="submit" disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Não tem uma conta? </span>
          <Link to="/cadastro" className="text-primary hover:text-primary-dark font-medium">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;