#!/bin/bash

echo "🚀 INICIANDO CORREÇÃO COMPLETA DO PROJETO..."

# 1. Instalar Tailwind CSS corretamente
echo "📦 Instalando Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer

# 2. Inicializar configuração do Tailwind
echo "⚙️ Configurando Tailwind..."
npx tailwindcss init -p

# 3. Configurar tailwind.config.js
echo "🎨 Configurando tailwind.config.js..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3f1142',
        'primary-hover': '#4338ca',
        'primary-dark': '#2d0c30',
        'secondary': '#10b981',
        'light-bg': '#f3f4f6',
        'dark-text': '#1f2937',
        'light-text': '#6b7280',
      },
    },
  },
  plugins: [],
}
EOF

# 4. Criar pasta de estilos e arquivo CSS
echo "�� Criando arquivos de estilo..."
mkdir -p src/styles

cat > src/styles/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos personalizados */
.btn-primary {
  @apply bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-md;
}

.btn-outline {
  @apply border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors;
}

/* Garantir que as cores funcionem */
.text-primary { color: #3f1142 !important; }
.bg-primary { background-color: #3f1142 !important; }
.border-primary { border-color: #3f1142 !important; }

.text-secondary { color: #10b981 !important; }
.bg-secondary { background-color: #10b981 !important; }
EOF

# 5. Atualizar index.html
echo "📄 Atualizando index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="16x16"  href="./src/assets/Logo-16x16.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <title>DescomplicAi</title>
    
    <!-- CSS do Tailwind -->
    <link rel="stylesheet" href="/src/styles/index.css">

    <!-- Import Map para React -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react/": "https://aistudiocdn.com/react@^19.2.0/",
        "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/"
      }
    }
    </script>
  </head>
  <body>
    <noscript>Você precisa habilitar o JavaScript para rodar este aplicativo.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
EOF

# 6. Corrigir constants.tsx com imagens locais
echo "🖼️ Corrigindo imagens..."
cat > constants.tsx << 'EOF'
import React from 'react';
import type { TeamMember } from './types';

// TIME - usando imagens locais
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sara Cristina Batista Wendling',
    role: 'Suporte',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Lucas Phelipe Castanho Ribeiro',
    role: 'Desenvolvedor Back-end',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Felipe Martins',
    role: 'Desenvolvedor Back-End',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Samira Batista Wendling',
    role: 'Tester',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Bruno Scheifer Landuche',
    role: 'Desenvolvedor Back-end',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Alderi Cristina Anderes Dzievieski',
    role: 'Desenvolvedora Back-end',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Wanderlei de Moraes Pego',
    role: 'Desenvolvedor Back-end',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'Felipe Neves Rodrigues',
    role: 'Desenvolvedor Front-end',
    photoUrl: '/fotos/will.jpeg',
  },
  {
    name: 'William de Camargo Smolarek',
    role: 'Product Owner',
    photoUrl: '/fotos/will.jpeg',
  }
];

// FEATURES
export const FEATURES = [
  {
    title: "Controle de Estoque Inteligente",
    description: "Gerencie seu estoque com nossa IA",
    icon: "📦"
  },
  {
    title: "Relatórios Automáticos", 
    description: "Relatórios detalhados em tempo real",
    icon: "📊"
  },
  {
    title: "Previsão de Demanda",
    description: "Antecipe tendências com machine learning",
    icon: "🔮"
  }
];
EOF

# 7. Criar cópias das fotos para todos os membros
echo "📸 Criando fotos para todos os membros..."
cd public/fotos/
for i in {1..8}; do 
  cp will.jpeg member$i.jpeg 2>/dev/null || true
done
cd ../..

# 8. Atualizar vite.config.ts
echo "🔧 Atualizando Vite config..."
cat > vite.config.ts << 'EOF'
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: ['landingpage-oa9e.onrender.com'],
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
       'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      css: {
        postcss: './postcss.config.js'
      }
   };
});
EOF

# 9. Configurar PostCSS
echo "🛠️ Configurando PostCSS..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 10. Testar o build
echo "🏗️ Testando build..."
npm run build

# 11. Iniciar servidor
echo "🎉 Iniciando servidor de desenvolvimento..."
npm run dev

echo "✅ CORREÇÃO COMPLETADA! O site deve estar funcionando agora."
