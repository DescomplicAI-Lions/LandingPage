import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ✅ COLE SUAS CREDENCIAIS REAIS AQUI:
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAme7bxjNmDWuDR-683qDaupx9RQTkY5gI",
  authDomain: "descomplicai-3e611.firebaseapp.com",
  projectId: "descomplicai-3e611",
  storageBucket: "descomplicai-3e611.firebasestorage.app",
  messagingSenderId: "640747589583",
  appId: "1:640747589583:web:2135cfeadf73e1caf7ccba",
  measurementId: "G-P59CEYTJZ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
