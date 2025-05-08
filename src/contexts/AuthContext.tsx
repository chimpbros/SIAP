import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

// Define the shape of the context data
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isApproved: boolean;
  isAdmin: boolean;
  // Add user profile data
  nama: string | null;
  pangkat: string | null;
  nrp: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nama, setNama] = useState<string | null>(null);
  const [pangkat, setPangkat] = useState<string | null>(null);
  const [nrp, setNrp] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      // Reset all user-specific data on auth state change
      setIsApproved(false);
      setIsAdmin(false);
      setNama(null);
      setPangkat(null);
      setNrp(null);

      if (user) {
        // If user is logged in, fetch their Firestore data
        setLoading(true); // Set loading true while fetching Firestore data
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsApproved(userData.is_approved === true);
            setIsAdmin(userData.is_admin === true);
            setNama(userData.nama || null);
            setPangkat(userData.pangkat || null);
            setNrp(userData.nrp || null);
          } else {
            console.warn("User document not found in Firestore for UID:", user.uid);
            // Keep isApproved/isAdmin as false
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Keep states as default (false/null)
        } finally {
          // Set loading to false after attempting to fetch Firestore data
          setLoading(false);
        }
      } else {
        // No user logged in, set loading to false
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Run only once on mount

  // Value provided by the context
  const value: AuthContextType = {
    currentUser,
    loading,
    isApproved,
    isAdmin,
    nama,
    pangkat,
    nrp,
  };

  // Render children only when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
