import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  type User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { logInfo, logError } from '../utils/logger';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (
  email: string, 
  password: string, 
  name: string
): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateUserData(user, { displayName: name });
    logInfo('User registered with email', { email });
    return mapFirebaseUser(user);
  } catch (error) {
    logError(error as Error, { context: 'Email Registration' });
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await updateUserData(user);
    logInfo('User logged in with email', { email });
    return mapFirebaseUser(user);
  } catch (error) {
    logError(error as Error, { context: 'Email Login' });
    throw error;
  }
};

export const loginWithGoogle = async (): Promise<User> => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    await updateUserData(user);
    logInfo('User logged in with Google', { email: user.email });
    return mapFirebaseUser(user);
  } catch (error) {
    logError(error as Error, { context: 'Google Login' });
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    logInfo('User logged out');
  } catch (error) {
    logError(error as Error, { context: 'Logout' });
    throw error;
  }
};

const updateUserData = async (user: FirebaseUser, additionalData?: Record<string, any>) => {
  const userRef = doc(db, 'users', user.uid);
  const userData = {
    email: user.email,
    displayName: additionalData?.displayName || user.displayName,
    photoURL: user.photoURL,
    lastLogin: new Date().toISOString(),
    ...additionalData
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    logError(error as Error, { context: 'Update User Data' });
  }
};

const mapFirebaseUser = (user: FirebaseUser): User => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
});