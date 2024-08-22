import Axios from "../utils/fecth";
import { AxiosError } from "axios";
import { create } from "zustand";

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

export type Inputs = {
  username?: string;
  email: string;
  password: string;
};

interface AuthStore {
  currentUser: User | null;
  loading: boolean;
  status: boolean;
  error: string | null | Error;
  login: (inputs: Inputs) => Promise<void>;
  logout: (user: User | null) => Promise<void>;
  register: (inputs: Inputs) => Promise<void>;
}
const storedUser = localStorage.getItem("currentUser");
const initialUser: User = storedUser ? JSON.parse(storedUser) : null;

export const useAuth = create<AuthStore>((set) => ({
  currentUser: initialUser,
  loading: false,
  error: null,
  status: false,

  login: async (inputs: Inputs) => {
    set({ loading: true, error: null, status: false });
    try {
      const res = await Axios.post("/auth/login", inputs);
      set({ currentUser: res.data });
      if (res.status == 200) {
        set({ status: true });
      }
      console.log(res.status);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      set({ loading: false });
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },

  register: async (inputs) => {
    set({ loading: true, error: null });
    try {
      const res = await Axios.post("/auth/register", inputs);
      res.status == 200 && set({ status: true });
      console.log(res.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },

  logout: async (inputs) => {
    set({ loading: true, error: null });
    try {
      await Axios.post("/auth/logout", inputs);
      set({ currentUser: null, loading: false });
      localStorage.removeItem("currentUser");
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },
}));
