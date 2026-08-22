import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0844707283",
  appId: "1:329970241407:web:555f622eb8909d5f21944a",
  apiKey: "AIzaSyA63SRthilnKkOf09dAcBPSbln6PXOjHYM",
  authDomain: "gen-lang-client-0844707283.firebaseapp.com",
  storageBucket: "gen-lang-client-0844707283.firebasestorage.app",
  messagingSenderId: "329970241407"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Use the specific database ID as generated
export const db = getFirestore(app, "ai-studio-ludomax-65a7b85a-f0ef-41ea-891f-c031757e7b3a");
export const googleProvider = new GoogleAuthProvider();
