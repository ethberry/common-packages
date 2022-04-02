import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ApiError, IJwt, useApi } from "@gemunion/provider-api";

import { ILoginDto, IUser, UserContext } from "./context";

interface IUserProviderProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(storageName);
    setProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

  const save = (key: string, profile: T | null): void => {
    const json = JSON.stringify(profile);
    localStorage.setItem(key, json);
  };

  const setProfileHandle = (profile: T | null) => {
    setProfile(profile);
    save(storageName, profile);
  };

  const updateProfile = async (values: Partial<T>): Promise<void> => {
    return api
      .fetchJson({
        url: "/profile",
        method: "PUT",
        data: values,
      })
      .then((json: T): void => {
        setProfileHandle(json);
      })
      .catch((e: ApiError) => {
        console.error(e);
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
        console.error(e);
        throw e;
      });
  };

  const sync = async (url?: string): Promise<void> => {
    return api
      .fetchJson({
        url: "/profile",
      })
      .then((json: T) => {
        setProfileHandle(json);
        if (json) {
          if (url) {
            navigate(url);
          }
        } else {
          navigate("/login");
        }
      })
      .catch((e: ApiError) => {
        console.error(e);
        throw e;
      });
  };

  const logIn = async (data: ILoginDto, url = "/"): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return sync(url);
      })
      .catch((e: ApiError) => {
        console.error(e);
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
        logIn,
        logOut,
        sync,
        updateProfile,
        isAuthenticated,
        setProfile: setProfileHandle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
