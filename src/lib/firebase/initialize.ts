import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { logError, logInfo } from '../utils/logger';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

export const initializeFirebase = (config: FirebaseOptions): FirebaseServices => {
  try {
    // Initialize Firebase app
    const app = initializeApp(config);
    logInfo('Firebase app initialized successfully');

    // Initialize Firebase services
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    logInfo('Firebase services initialized successfully');

    return { app, auth, db };
  } catch (error) {
    logError(error as Error, {
      context: 'Firebase Initialization',
      config: {
        projectId: config.projectId,
        authDomain: config.authDomain
      }
    });
    throw new Error('Failed to initialize Firebase services');
  }
};