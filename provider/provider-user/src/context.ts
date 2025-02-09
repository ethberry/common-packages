import { createContext } from "react";

import { IIdBase } from "@ethberry/types-collection";

export interface IUser extends IIdBase {
  language: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface ISignUpDto {
  email: string;
  displayName: string;
  password: string;
  confirm: string;
}

export interface IUserContext<T> {
  profile: T;
  getProfile: (url?: string) => Promise<T>;
  setProfile: (data: Partial<T>) => Promise<T>;
  logIn: (data: ILoginDto, url?: string) => Promise<T | void>;
  signUp: (data: ISignUpDto, url?: string) => Promise<T | void>;
  logOut: (url?: string) => Promise<void>;
  isAuthenticated: () => boolean;
}

export const UserContext = createContext<IUserContext<any>>(undefined!);
