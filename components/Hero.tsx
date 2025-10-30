import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-12 pb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-dark-text">
        Transforme a Gestão do Seu Negócio<br />
        <span className="text-primary">com Inteligência e Simplicidade</span>
      </h1>
      <p className="mt-4 text-xl text-light-text max-w-2xl mx-auto">
        Otimize processos, reduza custos e tome decisões estratégicas com a plataforma inteligente e intuitiva da <span className="font-bold text-primary">DescomplicAI</span>.
      </p>
      <div className="mt-8">
        <a
          href="#problema"
          className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Conheça a Solução
        </a>
      </div>
    </section>
  );
};

export default Hero;