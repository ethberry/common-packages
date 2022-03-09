import { createContext } from "react";
import { IIdBase } from "@gemunion/types-collection";

export interface IUser extends IIdBase {
  language: string;
}

export interface IUserContext<T> {
  profile: T;
  logIn: (profile: T) => void;
  logOut: () => void;
  sync: (url?: string) => Promise<void>;
  isAuthenticated: () => boolean;
}

export const UserContext = createContext<IUserContext<any>>(undefined!);
