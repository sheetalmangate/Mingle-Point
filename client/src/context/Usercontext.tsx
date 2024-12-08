import React, { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  username : string;
  setUsername : (username : string) => void;
}

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  username : '',
  setUsername : () => {}
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const [username, setUsername] = useState<string>("");
  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};