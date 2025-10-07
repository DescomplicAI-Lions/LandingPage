
import React from 'react';

const ProblemSolution: React.FC = () => {
  return (
    <section id="problema" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-dark-text mb-4">O Problema</h2>
            <p className="text-light-text leading-relaxed">
              Empresas dos setores alimentícios possuem um problema com a demanda de produtos do estoque, muitas vezes havendo descarte ou falta de alimentos.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Nossa Solução</h2>
            <p className="text-light-text leading-relaxed">
              Nosso produto centraliza todas as informações do projeto em um único lugar. Com uma interface intuitiva, ferramentas de colaboração em tempo real e relatórios automáticos, sua empresa pode focar no que realmente importa: controlar seu estoque e suas finanças com total visibilidade do processo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
