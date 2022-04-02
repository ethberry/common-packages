import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ApiError, IJwt, useApi } from "@gemunion/provider-api";

import { ILoginDto, ISignUpDto, IUser, UserContext } from "./context";

interface IUserProviderProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setUserProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(storageName);
    setUserProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

  const save = (key: string, profile: T | null): void => {
    const json = JSON.stringify(profile);
    localStorage.setItem(key, json);
  };

  const setProfileHandle = (profile: T | null) => {
    setUserProfile(profile);
    save(storageName, profile);
  };

  const getProfile = async (url?: string): Promise<T> => {
    return api
      .fetchJson({
        url: "/profile",
      })
      .then((json: T) => {
        setProfileHandle(json);
        if (url) {
          navigate(url);
        }
        return json;
      });
  };

  const setProfile = async (data: Partial<T>): Promise<T> => {
    return api
      .fetchJson({
        url: "/profile",
        method: "PUT",
        data,
      })
      .then((json: T): T => {
        setProfileHandle(json);
        return json;
      });
  };

  const logIn = async (data: ILoginDto, url?: string): Promise<T> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return getProfile(url);
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        throw e;
      });
  };

  const logOut = async (): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/logout",
        method: "POST",
        data: {
          refreshToken: api.getToken()?.refreshToken,
        },
      })
      .then(() => {
        setProfileHandle(null);
        api.setToken(null);
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        throw e;
      });
  };

  const signUp = async (data: ISignUpDto, url = "/"): Promise<T> => {
    return api
      .fetchJson({
        url: "/auth/signup",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return getProfile(url);
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        throw e;
      });
  };

  const isAuthenticated = (): boolean => {
    return profile !== null;
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        getProfile,
        setProfile,
        logIn,
        logOut,
        signUp,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
