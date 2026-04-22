import { doc, getDoc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { ResumeData } from '../types';

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: any[];
  }
}

const handleFirestoreError = (error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null): never => {
  const authInfo = auth.currentUser ? {
    userId: auth.currentUser.uid,
    email: auth.currentUser.email || '',
    emailVerified: auth.currentUser.emailVerified,
    isAnonymous: auth.currentUser.isAnonymous,
    providerInfo: auth.currentUser.providerData.map(p => ({
      providerId: p.providerId,
      displayName: p.displayName,
      email: p.email
    }))
  } : {
    userId: 'anonymous',
    email: '',
    emailVerified: false,
    isAnonymous: true,
    providerInfo: []
  };

  const errorInfo: FirestoreErrorInfo = {
    error: error.message || 'Unknown Firestore error',
    operationType,
    path,
    authInfo
  };

  throw new Error(JSON.stringify(errorInfo));
};

export const saveResume = async (slug: string, data: ResumeData) => {
  try {
    const resumeRef = doc(db, 'resumes', slug);
    const snapshot = await getDoc(resumeRef);
    
    if (snapshot.exists()) {
      throw new Error('This custom name is already taken. Try something else!');
    }

    await setDoc(resumeRef, {
      slug,
      data,
      createdAt: serverTimestamp(),
    });

    return slug;
  } catch (error: any) {
    if (error.message.includes('already taken')) throw error;
    handleFirestoreError(error, 'create', `resumes/${slug}`);
  }
};

export const getResumeBySlug = async (slug: string) => {
  try {
    const resumeRef = doc(db, 'resumes', slug);
    const snapshot = await getDoc(resumeRef);
    
    if (snapshot.exists()) {
      return snapshot.data().data as ResumeData;
    }
    
    return null;
  } catch (error: any) {
    handleFirestoreError(error, 'get', `resumes/${slug}`);
  }
};

// Check connection on boot
export const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
};
