
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-dark-text tracking-tight">
          Seu Negócio <span className="text-primary">Descomplicado</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-light-text">
          Nossa solução transforma a maneira como você gerencia suas tarefas, aumentando a produtividade e simplificando processos complexos.
        </p>
        <div className="mt-8">
          <a
            href="#features"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
