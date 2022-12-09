import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { useEffect, useState, useContext, createContext } from 'react';

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const auth = getAuth(getApp());
  auth.setPersistence(getReactNativePersistence(AsyncStorage));

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credential.user);
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await signOut(auth);
      setUser(null);
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((state) => {
      if (state) {
        setUser(state);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    setInitialized(true);

    return () => unsubscribe();
  }, []);

  return { user, loading, initialized, login, logout };
};

export { ProvideAuth, useAuth };
