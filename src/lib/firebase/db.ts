import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc 
} from 'firebase/firestore';
import { db } from './config';
import { logError } from '../utils/logger';

export const createDocument = async <T extends Record<string, any>>(
  collectionName: string, 
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    logError(error as Error, { context: 'Create Document', collection: collectionName });
    throw error;
  }
};

export const updateDocument = async <T extends Record<string, any>>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
  } catch (error) {
    logError(error as Error, { context: 'Update Document', collection: collectionName });
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    logError(error as Error, { context: 'Delete Document', collection: collectionName });
    throw error;
  }
};

export const queryDocuments = async <T>(
  collectionName: string,
  conditions: [string, any, any][]
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      ...conditions.map(([field, op, value]) => where(field, op, value))
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
  } catch (error) {
    logError(error as Error, { context: 'Query Documents', collection: collectionName });
    throw error;
  }
};