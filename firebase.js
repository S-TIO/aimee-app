import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { 
  getStorage
} from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: 'AIzaSyBM6mjoMCk20nk4ClG8mCaYzzUn8hcO-YQ',
    authDomain: 'aimee-6d10e.firebaseapp.com',
    projectId: 'aimee-6d10e',
    storageBucket: 'aimee-6d10e.appspot.com',
    messagingSenderId: '361835717642',
    appId: '1:361835717642:web:47ba5cfdadbccaf867ebf3',
  };
const firebaseApp = initializeApp(firebaseConfig);
initializeAuth(firebaseApp, {
persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth();
const db = getFirestore();
const fbStorage = getStorage();


// getDocs('/OnlineClass').then((x)=>console.log(x))

export {auth, db, fbStorage}