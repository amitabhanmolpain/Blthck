import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Mock sign up - always succeeds
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      user_metadata: {
        full_name: fullName,
      },
    };
    
    setUser(mockUser);
    
    // Store user in localStorage for persistence
    localStorage.setItem('ghostify_user', JSON.stringify(mockUser));
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock sign in - always succeeds
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      user_metadata: {
        full_name: email.split('@')[0], // Use email prefix as name
      },
    };
    
    setUser(mockUser);
    
    // Store user in localStorage for persistence
    localStorage.setItem('ghostify_user', JSON.stringify(mockUser));
    
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('ghostify_user');
  };

  // Check for stored user on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('ghostify_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('ghostify_user');
      }
    }
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};