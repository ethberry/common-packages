import { createContext } from "react";

import { IIdBase } from "@gemunion/types-collection";

export interface IUser extends IIdBase {
  language: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IUserContext<T> {
  profile: T;
  logIn: (data: ILoginDto, successLoginUrl?: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (profile: Partial<T>) => Promise<void>;
  setProfile: (profile: T | null) => void;
  sync: (url?: string) => Promise<void>;
  isAuthenticated: () => boolean;
}

export const UserContext = createContext<IUserContext<any>>(undefined!);
