import React, { useContext, useEffect, useState, PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router";

import { ApiContext, IApiContext } from "@gemunion/provider-api";

import { UserContext, IUser } from "./context";

const STORAGE_NAME = "auth";

interface IUserProviderProps<T> {
  profile?: T | null;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, children } = props;
  const [profile, setProfile] = useState<T | null>(defaultProfile);
  const history = useHistory();

  const api = useContext<IApiContext<any>>(ApiContext);

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_NAME);
    setProfile(auth ? JSON.parse(auth) : null);
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
        if (isAuthenticated()) {
          if (url) {
            history.push(url);
          } else {
            history.go(0);
          }
        } else {
          history.push("/login");
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
