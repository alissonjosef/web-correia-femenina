import { createContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  imgAvatar: string;
}

interface AuthContextType {
  tokenStorage: string;
  setTokenStorage: (value: any) => void;
  user: User | (() => User | null) | null | {};
  setUser: (value: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  tokenStorage: "",
  setTokenStorage: (value: any) => {},
  user: null,
  setUser: (value: any) => {},
});

export const AuthProvider = ({ children }: any) => {
  const [tokenStorage, setTokenStorage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenStorage(storedToken);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const uniqueId = Date.now() + Math.random().toString(36).substring(2);
        setUser({ ...parsedUser, id: uniqueId });
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ tokenStorage, setTokenStorage, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
