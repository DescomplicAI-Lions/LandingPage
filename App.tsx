
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Team from './components/Team';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  return (
    <div className="bg-light-bg min-h-screen font-sans text-dark-text">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default App;
