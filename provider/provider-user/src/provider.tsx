import { useContext, useEffect, useState, PropsWithChildren, ReactElement } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { ApiError, IJwt, useApi } from "@gemunion/provider-api";

import { UserContext, IUser, IUserContext, ILoginDto } from "./context";

const STORAGE_NAME = "auth";

interface IUserProviderProps<T> {
  profile?: T | null;
}

export const UserProvider = <T extends IUser>(props: PropsWithChildren<IUserProviderProps<T>>): ReactElement | null => {
  const { profile: defaultProfile = null, children } = props;

  const [profile, setProfile] = useState<T | null>(defaultProfile);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const api = useApi();

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_NAME);
    setProfile(auth ? (JSON.parse(auth) as T) : null);
  }, []);

  const save = (key: string, profile: T | null): void => {
    const json = JSON.stringify(profile);
    localStorage.setItem(key, json);
  };

  const setProfileHandle = (profile: T) => {
    setProfile(profile);
    save(STORAGE_NAME, profile);
  };

  const updateProfile = (values: Partial<T>): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/profile",
        method: "PUT",
        data: {
          ...values,
        },
      })
      .then((json: T): void => {
        enqueueSnackbar(formatMessage({ id: "snackbar.updated" }), { variant: "success" });
        setProfileHandle(json);
      })
      .catch((e: ApiError) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
        return e;
      });
  };

  const logOut = (): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/auth/logout",
        method: "POST",
        data: {
          refreshToken: api.getToken()?.refreshToken,
        },
      })
      .then(() => {
        setProfile(null);
        save(STORAGE_NAME, null);
        api.setToken(null);
      })
      .catch((e: ApiError) => {
        if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
        }

        return e;
      });
  };

  const sync = (url?: string): Promise<ApiError | void> => {
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
      .catch(e => {
        console.error(e);
        return logOut();
      });
  };

  const logIn = (data: ILoginDto, successLoginUrl = "/"): Promise<ApiError | void> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        if (json) {
          api.setToken(json);
        }

        return sync(successLoginUrl);
      })
      .catch((e: ApiError) => {
        if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }

        return e;
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser<T>() {
  return useContext<IUserContext<T>>(UserContext);
}
