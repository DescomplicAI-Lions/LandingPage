import type { TeamMember } from "./types";

export const TEAM_MEMBERS: TeamMember[] = [
   {
      name: "Lucas Andrade",
      role: "Desenvolvedor Front-End",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", // Pikachu
   },
   {
      name: "Marina Souza",
      role: "Gerente de Projeto",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", // Jigglypuff
   },
   {
      name: "Felipe Torres",
      role: "Desenvolvedor Back-End",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", // Charizard
   },
   {
      name: "Renata Lima",
      role: "UI/UX Designer",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png", // Gengar
   },
   {
      name: "Eduardo Tavares",
      role: "Especialista em IA",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", // Mewtwo
   },
   {
      name: "Jéssica Lopes",
      role: "Engenheira de Dados",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png", // Snorlax
   },
   {
      name: "Gabriel Prado",
      role: "Analista de Sistemas",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", // Venusaur
   },
   {
      name: "Patrícia Fonseca",
      role: "Especialista em Marketing",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png", // Pidgeot
   },
   {
      name: "Vinícius Rocha",
      role: "Scrum Master",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png", // Lapras
   },
   {
      name: "Camila Dias",
      role: "QA Tester",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", // Charmander
   },
   {
      name: "Lucas Ribeiro",
      role: "DevOps Engineer",
      photoUrl:
         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", // Squirtle
   },
];

export const FEATURES = [
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
         </svg>
      ),
      title: "Interface Intuitiva",
      description:
         "Design moderno e fácil de usar, permitindo que novos usuários comecem a usar o produto em minutos.",
   },
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
         </svg>
      ),
      title: "Colaboração em Tempo Real",
      description:
         "Trabalhe em equipe de forma sincronizada, com atualizações instantâneas para todos os membros.",
   },
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
         </svg>
      ),
      title: "Relatórios Detalhados",
      description:
         "Gere insights valiosos com nossos relatórios automáticos e personalizáveis para acompanhar o progresso.",
   },
];
