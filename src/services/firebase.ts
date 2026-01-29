import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAme7bxjNmDWuDR-683qDaupx9RQTkY5gI",
  authDomain: "descomplicai-3e611.firebaseapp.com",
  projectId: "descomplicai-3e611",
  storageBucket: "descomplicai-3e611.firebasestorage.app",
  messagingSenderId: "640747589583",
  appId: "1:640747589583:web:2135cfeadf73e1caf7ccba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// BYPASS PROXY & WORK OFFLINE
// if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
// }