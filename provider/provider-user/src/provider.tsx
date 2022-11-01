import { PropsWithChildren, ReactElement, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { ApiError, IJwt, useApi } from "@gemunion/provider-api";

import { ILoginDto, ISignUpDto, IUser, UserContext } from "./context";
import { save } from "./utils";

interface IUserProviderProps<T> {
  profile: T | null;
  setUserProfile: (data: any) => void;
  storageName?: string;
  customLogIn?: (data?: ILoginDto, url?: string) => Promise<T | void>;
  customSignUp?: (data?: ISignUpDto, url?: string) => Promise<T | void>;
  customLogOut?: (url?: string) => Promise<void>;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { customLogIn, customSignUp, customLogOut, profile, setUserProfile, storageName = "user", children } = props;

  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(storageName);
    setUserProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

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

  const logIn = async (data?: ILoginDto, url?: string): Promise<T> => {
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

  const logOut = async (url?: string): Promise<void> => {
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
        if (url) {
          navigate(url);
        }
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

  const isAuthenticated = useCallback((): boolean => {
    return profile !== null;
  }, [profile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        getProfile,
        logIn: customLogIn || logIn,
        logOut: customLogOut || logOut,
        signUp: customSignUp || signUp,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
