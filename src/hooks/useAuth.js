import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
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
      setLoading(false);
      return { error };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await signOut(auth);
      setUser(null);
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const register = async (displayName, email, password) => {
    try {
      setLoading(true);

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName });

      setUser(credential.user);
    } catch (error) {
      setLoading(false);

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

  return { user, loading, initialized, login, logout, register };
};

export { ProvideAuth, useAuth };
