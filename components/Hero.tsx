import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-16 text-center px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-dark-text leading-tight">
        Transforme a Gestão do Seu Negócio<br />
        <span className="text-primary">com Inteligência e Simplicidade</span>
      </h1>
      <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-light-text max-w-2xl mx-auto leading-relaxed">
        Otimize processos, reduza custos e tome decisões estratégicas com a plataforma inteligente e intuitiva da <span className="font-bold text-primary">DescomplicAI</span>.
      </p>
      <div className="mt-6 md:mt-8">
        <a
          href="#problema"
          className="inline-block bg-primary text-white font-semibold px-6 py-3 md:px-8 md:py-3 rounded-lg shadow-md hover:bg-primary-dark transition text-sm md:text-base"
        >
          Conheça a Solução
        </a>
      </div>
    </section>
  );
};

export default Hero;
