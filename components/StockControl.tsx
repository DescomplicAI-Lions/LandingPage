import React from 'react';

const StockControl: React.FC = () => {
  return (
    <section id="stock-control-example" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">Exemplo de Controle de Estoque</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text">
            Veja como é fácil gerenciar seu inventário com nossa plataforma.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-dark-text mb-4">Visão Geral do Inventário</h3>
            <p className="text-lg text-light-text mb-4">
              Acompanhe todos os seus produtos em um painel intuitivo. Visualize quantidades em estoque, produtos com baixo nível e movimentações recentes.
            </p>
            <ul className="list-disc list-inside text-light-text space-y-2">
              <li>Produtos em tempo real</li>
              <li>Alertas de estoque mínimo</li>
              <li>Histórico de movimentações</li>
              <li>Categorização de itens</li>
            </ul>
          </div>
          <div>
            {/* Placeholderpara uma imagem simples */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h4 className="font-semibold text-dark-text mb-2">Painel de Estoque</h4>
              <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
                <p><strong>Produto A:</strong> 150 unidades (Alto/Excessivo)</p> {/* O estoque está acima do ponto de reposição */}
                <p><strong>Produto B:</strong> 25 unidades (Mínimo)</p> {/* O estoque está no mínimo aceitável */}
                <p><strong>Produto C:</strong> 80 unidades (Suficiente)</p> {/* O estoque está na faixa ideal */}
                <p><strong>Produto D:</strong> 10 unidades (Crítico!)</p> {/* O estoque está abaixo do nível de segurança e precisa de reposição */}
                <p className="mt-2 text-xs text-gray-500">Última atualização: 5 minutos atrás</p>
              </div>
              <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
                Ver Detalhes Completos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockControl;