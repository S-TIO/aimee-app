import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getReactNativePersistence,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth/react-native';
import { useEffect, useState, useContext, createContext } from 'react';
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { updateUser, saveUser } from '../components/User';

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

  const signIn = async () => {
    try {
      setLoading(true);

      const { idToken } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      const { user } = await signInWithCredential(auth, credential);

      setUser(user)
      
      const updateStatus = await updateUser (user.uid, {
        updatedAt: serverTimestamp(),
      });

      if (updateStatus.error) {
        await saveUser (user.uid, {
          userName: user.displayName,
          userEmail: user.email,
          createdAt: serverTimestamp(),
          userImg: user.photoURL,
        })
      }
    
    } catch (error) {
      setLoading(false);
      console.log(error);
      return { error };
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credential.user)
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await GoogleSignin.signOut();
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
      

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        userName: displayName,
        userEmail: email,
        createdAt: serverTimestamp(),
        userImg: null,
      });

      } catch (error) {
      setLoading(false);
      console.log(error);
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

  return { user, loading, initialized, login, logout, register, signIn };
};

export { ProvideAuth, useAuth };
