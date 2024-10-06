// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'next-social-app-d51a2.firebaseapp.com',
  projectId: 'next-social-app-d51a2',
  storageBucket: 'next-social-app-d51a2.appspot.com',
  messagingSenderId: '335910023306',
  appId: '1:335910023306:web:2548b4c3f4838e12ee7d73',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
