import { PropsWithChildren, ReactElement, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { useApi } from "@ethberry/provider-api";

import { ILoginDto, ISignUpDto, IUser, UserContext } from "./context";
import { save } from "./utils";

interface IUserProviderProps<T> {
  profile: T | null;
  setUserProfile: (data: any) => void;
  storageName?: string;
  customLogIn: (data: ILoginDto) => Promise<T | void>;
  customSignUp: (data: ISignUpDto) => Promise<T | void>;
  customLogOut: () => Promise<void>;
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
          void navigate(url, { replace: true });
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

  const isAuthenticated = useCallback((): boolean => {
    return profile !== null;
  }, [profile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        getProfile,
        logIn: (data: ILoginDto, url?: string) =>
          customLogIn(data).then(() => {
            return getProfile(url);
          }),
        signUp: (data: ISignUpDto, url?: string) =>
          customSignUp(data).then(() => {
            return getProfile(url);
          }),
        logOut: (url?: string) =>
          customLogOut().then(() => {
            setProfileHandle(null);
            if (url) {
              void navigate(url, { replace: true });
            }
          }),
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
