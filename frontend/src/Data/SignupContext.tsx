
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = "Customer" | "Business";

interface UserTypeContextProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserTypeContext = createContext<UserTypeContextProps | undefined>(undefined);

export const UserTypeProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType>("Customer");

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
};
