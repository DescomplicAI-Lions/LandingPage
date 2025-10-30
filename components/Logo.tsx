
import React from 'react';

const Logo: React.FC = () => {
  // return (
  //   <div className="flex items-center space-x-2">
  //      <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
  //     </svg>
  //     <span className="font-bold text-xl text-dark-text">MeuProjeto</span>
  //   </div>
  // );
   return (
    <div className="flex items-center space-x-2">
      <img src="../src/assets/LogoLonga-500x500.png" alt="MeuProjeto Logo" className="h-12 w-auto" />
      <span className="font-bold text-xl text-dark-text">
        Descom
        <span className="text-primary">plicAI</span> 
      </span>
    </div>
  );
};

export default Logo;
