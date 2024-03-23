import {  ReactNode, createContext, useEffect, useState } from "react";
import Axios from "../utils/fecth";

type Input={
  email:string,
 password:string
}
export type User = {
  user: {
    id: number;
    username: string | null;
    email: string;
    telephone: string | null;
    img: string | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

interface AuthContextProps {
  children: ReactNode;
}

export interface AuthContextValue {
  currentUser: User | null;
  login: (inputs: Input) => Promise<void>;
  logout: (inputs: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = ({ children}:AuthContextProps) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrenUser] = useState<User | null>(initialUser);

  const login = async (inputs: Input) => {
    const res = await Axios.post("/auth/login", inputs);
    setCurrenUser(res.data);
  };

  const logout = async (inputs: User) => {
    await Axios.post("/auth/logout", inputs);
    setCurrenUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
