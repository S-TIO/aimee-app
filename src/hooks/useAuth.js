import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  getReactNativePersistence,
  GoogleAuthProvider
} from 'firebase/auth/react-native';
import { useEffect, useState, useContext, createContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

// const config = Google.useAuthRequest({
//   androidClientId:
//     "361835717642-dfdfguumrkt9p5341h93te9kek7d1a82.apps.googleusercontent.com",
//   iosClientId:
//     "361835717642-o5qjbprfu3o4kh9rpb6v6sljl9qdp3o8.apps.googleusercontent.com",
//   expoClientId:
//     "361835717642-7pjg9p993a6a90p3ub0gee6rhf44to2n.apps.googleusercontent.com",
// });

const useProvideAuth = () => {
  const auth = getAuth(getApp());
  auth.setPersistence(getReactNativePersistence(AsyncStorage));

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // const signInWithGoogle = async () => {
  // try{
  //   setLoading(true);

  //   await Google.useAuthRequest(config)
  //     .then(async (logInResult) => {
  //       if (logInResult.type === "success") {
  //         const { idToken, accessToken } = logInResult;
  //         const credential = GoogleAuthProvider.credential(
  //           idToken,
  //           accessToken
  //         );

  //         await signInWithCredential(auth, credential);
  //       }
  //       return Promise.reject();
  //     })
  //   }catch (error) {
  //       setLoading(false);
  //       return { error };
  //     }
  // };

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
