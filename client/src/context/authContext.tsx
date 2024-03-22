import {  ReactNode, createContext, useEffect, useState } from "react";
import Axios from "../utils/fecth";

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
const AuthContext = createContext({});
export const AuthContextProvider = ({ children}:AuthContextProps) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrenUser] = useState<User | null>(initialUser);

  const login = async (inputs: User) => {
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
