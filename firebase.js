import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { 
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
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


const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};


export {auth, db, fbStorage, uploadToFirebase}