import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { logInfo, logError } from '../utils/logger';
import type { AuthUser, RegisterData, AuthCredentials } from './types';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const authService = {
  async loginWithEmail({ email, password }: AuthCredentials): Promise<AuthUser> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      logInfo('User logged in with email', { email });
      return mapFirebaseUser(user);
    } catch (error) {
      logError(error as Error, { context: 'Email Login' });
      throw error;
    }
  },

  async loginWithGoogle(): Promise<AuthUser> {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await updateUserData(user);
      logInfo('User logged in with Google', { email: user.email });
      return mapFirebaseUser(user);
    } catch (error) {
      logError(error as Error, { context: 'Google Login' });
      throw error;
    }
  },

  async register({ email, password, name }: RegisterData): Promise<AuthUser> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserData(user, { displayName: name });
      logInfo('User registered successfully', { email });
      return mapFirebaseUser(user);
    } catch (error) {
      logError(error as Error, { context: 'User Registration' });
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
      logInfo('User logged out successfully');
    } catch (error) {
      logError(error as Error, { context: 'Logout' });
      throw error;
    }
  }
};

const updateUserData = async (user: any, additionalData?: Record<string, any>) => {
  const userRef = doc(db, 'users', user.uid);
  const userData = {
    email: user.email,
    displayName: additionalData?.displayName || user.displayName,
    photoURL: user.photoURL,
    role: 'user',
    lastLogin: new Date().toISOString(),
    ...additionalData
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    logError(error as Error, { context: 'Update User Data' });
  }
};

const mapFirebaseUser = (user: any): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  role: 'user' // Default role, should be fetched from Firestore in a production app
});