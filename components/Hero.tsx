import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="problema-solucao" className="pt-8 pb-12 md:pt-12 md:pb-16 text-center px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-dark-text leading-tight">
        Transforme a Gestão do Seu Negócio<br />
        <span className="text-primary">com Inteligência e Simplicidade</span>
      </h1>
      <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-light-text max-w-2xl mx-auto leading-relaxed">
        Otimize processos, reduza custos e tome decisões estratégicas com a plataforma inteligente e intuitiva da <strong>DescomplicAI</strong>.
      </p>
    </section>
  );
};

export default Hero;
