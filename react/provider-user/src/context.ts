import { createContext } from "react";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  language: string;
}

export interface IUserContext<T extends any> {
  profile: T;
  logIn: (profile: T) => void;
  logOut: () => void;
  sync: (url?: string) => Promise<void>;
  isAuthenticated: () => boolean;
}

export const UserContext = createContext<IUserContext<any>>(undefined!);
