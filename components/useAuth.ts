import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

let auth: any = null;

const initializeFirebase = async () => {
  try {
    const { auth: authInstance } = await import('../src/services/firebase');
    auth = authInstance;
    return auth;
  } catch (error) {
    console.warn('Firebase não configurado para auth state');
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const authInstance = await initializeFirebase();
      
      if (authInstance) {
        const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
          if (user) {
            try {
              await fetch('http://127.0.0.1:3000/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName,
                }),
              });
            } catch (err) {
              console.warn("Offline mode: Database sync skipped or backend unreachable");
            }
            // -----------------------------------
            
            setUser(user);
          } else {
            setUser(null);
          }
          setLoading(false);
        });
  
        return unsubscribe;
      } else {
        setLoading(false);
      }
    };
  
    const unsubscribePromise = initAuth();
  
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
    setUser(null);
  };

  return { user, loading, logout };
};
