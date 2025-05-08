import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

// Define the shape of the context data
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isApproved: boolean; // Add approval status
  isAdmin: boolean; // Add admin status
  // TODO: Potentially add user profile data (nama, pangkat, nrp) here later
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

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsApproved(false); // Reset on user change
      setIsAdmin(false); // Reset on user change

      if (user) {
        // If user is logged in, fetch their Firestore data for approval/admin status
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsApproved(userData.is_approved === true);
            setIsAdmin(userData.is_admin === true);
          } else {
            console.warn("User document not found in Firestore for UID:", user.uid);
            // Keep isApproved/isAdmin as false
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Keep isApproved/isAdmin as false
        }
      }
      // Set loading to false once auth state is determined and Firestore data (if applicable) is fetched
      setLoading(false);
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
  };

  // Render children only when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
