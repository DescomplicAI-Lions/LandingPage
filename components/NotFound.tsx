import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../src/assets/animations/404 Error.json"; 

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <div className="w-64 h-64 mb-4">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <p className="text-lg text-light-text mb-6">
        Ops! Esta página não existe.
      </p>

      <Link
        to="/"
        className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;