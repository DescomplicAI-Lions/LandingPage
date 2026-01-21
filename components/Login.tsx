import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// Caminho corrigido para sair de components e entrar em services
import { auth, googleProvider } from '../src/services/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const DASHBOARD_URL = "http://localhost:3000";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      localStorage.setItem('user', JSON.stringify({
        nome: user.displayName || 'Usuário',
        email: user.email,
        avatar: user.photoURL
      }));

      window.location.href = DASHBOARD_URL;
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
      
      localStorage.setItem('user', JSON.stringify({
        nome: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }));
      
      window.dispatchEvent(new Event('userLoginUpdate'));
      window.location.href = DASHBOARD_URL;
    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao fazer login com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text text-center">
            Entre na sua conta
          </h2>
        </div>
        
        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <img 
              className="h-5 w-5 mr-2" 
              src="https://www.google.com/favicon.ico" 
              alt="Google"
            />
            {loading ? 'Entrando...' : 'Entrar com Google'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-light-bg text-gray-500">Ou</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm sm:text-base"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Senha</label>
            <input
              id="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm sm:text-base"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/recuperar-senha" className="text-primary hover:text-primary-dark text-sm">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>

        <div className="text-center">
          <span className="text-gray-600 text-sm">Não tem uma conta? </span>
          <Link to="/cadastro" className="text-primary hover:text-primary-dark font-medium text-sm">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;