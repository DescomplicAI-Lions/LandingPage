import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomPokemonId = Math.floor(Math.random() * 151) + 1;
    const pokemonAvatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonId}.png`;

    const userData = {
      nome,
      email,
      avatar: pokemonAvatar,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("userLoginUpdate"));

    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}!`);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition"
        >
          Voltar
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-dark-text mb-2 font-medium">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-dark-text mb-2 font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div>
            <label className="block text-dark-text mb-2 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Crie uma senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-light-text mt-6">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
