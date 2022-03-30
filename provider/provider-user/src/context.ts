import { createContext } from "react";

import { IIdBase } from "@gemunion/types-collection";
import { ApiError } from "@gemunion/provider-api";

export interface IUser extends IIdBase {
  language: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IUserContext<T> {
  profile: T;
  logIn: (data: ILoginDto, successLoginUrl: string) => Promise<ApiError | void>;
  logOut: () => Promise<ApiError | void>;
  updateProfile: (profile: Partial<T>) => Promise<ApiError | void>;
  setProfile: (profile: T | null) => void;
  sync: (url?: string) => Promise<ApiError | void>;
  isAuthenticated: () => boolean;
}

export const UserContext = createContext<IUserContext<any>>(undefined!);
