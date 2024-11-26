import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  email: string | null;
  setAuthData: (token: string, email: string) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  
  const setAuthData = (token: string, email: string) => {
    setToken(token);
    setEmail(email);
  };

  const clearAuthData = () => {
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{token,email, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
