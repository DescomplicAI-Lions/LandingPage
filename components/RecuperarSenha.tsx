import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

        //Para quando o back estiver pronto
    
    /*try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess("Se o e-mail estiver cadastrado, um link de recuperação foi enviado.");
        setEmail("");
      } else {
        const data = await response.json();
        setError(data.message || "Ocorreu um erro. Por favor, tente novamente.");
      }

    } catch (apiError) {
      setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }*/
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="absolute top-6 left-6">
        <Link
          to="/login"
          className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition"
        >
          Voltar
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Recuperar Senha
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Visual: Erro */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {/* Feedback Visual: Sucesso */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          <div>
            <label className="block text-dark-text mb-2 font-medium">
              E-mail cadastrado
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Digite seu e-mail"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;
