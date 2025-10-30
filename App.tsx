import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Team from './components/Team';
import Footer from './components/Footer';
import NotFound from './components/NotFound'; 
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import RecuperarSenha from './components/RecuperarSenha';
import AlterarSenha from './components/alterarSenha';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-light-bg min-h-screen font-sans text-dark-text">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ProblemSolution />
                  <Features />
                  <Team />
                    </>
                        }
                     />
                    <Route path="/login" element={<Login />} />
                 <Route path="*" element={<NotFound />} />
               <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
           <Route path="/alterar-senha" element={<AlterarSenha />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;