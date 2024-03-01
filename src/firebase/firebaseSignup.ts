import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  onAuthStateChanged as onAuthStateChangedV9,
  User,
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';

const app = initializeApp(getFirebaseConfig());
const auth: Auth = getAuth(app);

export const signUpUser = async (
  email: string,
  password: string
) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const userStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChangedV9(auth, callback);
};
