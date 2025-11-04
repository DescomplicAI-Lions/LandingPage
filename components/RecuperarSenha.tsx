import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Um link de recuperação foi enviado para ${email}.`);
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition"
          >
            Enviar link de recuperação
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;
