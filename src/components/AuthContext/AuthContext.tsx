import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    tokenStorage: "",
    setTokenStorage: (value: any) => {}
  });

export const AuthProvider = ({ children }: any) => {
  const [tokenStorage, setTokenStorage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setTokenStorage(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ tokenStorage, setTokenStorage }}>
      {children}
    </AuthContext.Provider>
  );
};
