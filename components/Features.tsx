
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">Principais Características</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text">
            Tudo o que você precisa para levar sua produtividade para o próximo nível.
          </p>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-light-bg rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-dark-text">{feature.title}</h3>
              <p className="mt-2 text-base text-light-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
