import { useContext, useEffect, useState, PropsWithChildren, ReactElement } from "react";
import { useNavigate } from "react-router";

import { useApi } from "@gemunion/provider-api";

import { UserContext, IUser, IUserContext } from "./context";

const STORAGE_NAME = "auth";

interface IUserProviderProps<T> {
  profile?: T | null;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, children } = props;
  const [profile, setProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();

  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_NAME);
    setProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

  const save = (key: string, profile: T | null): void => {
    const json = JSON.stringify(profile);
    localStorage.setItem(key, json);
  };

  const logIn = (profile: T): void => {
    setProfile(profile);
    save(STORAGE_NAME, profile);
  };

  const logOut = (): void => {
    setProfile(null);
    save(STORAGE_NAME, null);
  };

  const isAuthenticated = (): boolean => {
    return profile !== null;
  };

  const sync = (url?: string): Promise<void> => {
    return api
      .fetchJson({
        url: "/profile",
      })
      .then((json: T) => {
        logIn(json);
        if (json) {
          if (url) {
            navigate(url);
          }
        } else {
          navigate("/login");
        }
      })
      .catch(e => {
        console.error(e);
        logOut();
      });
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        logIn,
        logOut,
        sync,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser<T>() {
  return useContext<IUserContext<T>>(UserContext);
}
