import React from 'react';

const ProblemSolution: React.FC = () => {
  return (
    <section id="problema" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Desafios na Gestão Empresarial</h2>
            <p className="text-light-text leading-relaxed">
              Empresas de diversos setores enfrentam dificuldades para integrar processos, acessar informações em tempo real e tomar decisões rápidas e seguras. Isso resulta em desperdícios, retrabalho e perda de oportunidades de crescimento.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Solução Inteligente e Integrada</h2>
            <p className="text-light-text leading-relaxed">
              Nossa plataforma centraliza e automatiza processos, oferecendo dados confiáveis e painéis intuitivos para gestão eficiente. Com tecnologia avançada, você toma decisões estratégicas, reduz custos e potencializa os resultados do seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;