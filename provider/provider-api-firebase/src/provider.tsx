import { FC, PropsWithChildren } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from "firebase/auth";

import firebase from "@gemunion/firebase";
import { history } from "@gemunion/history";
import { ApiProvider, IApiProviderProps, getToken, setToken, isAccessTokenExpired } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

import { useInterval } from "./hook";

export const ensureAsyncConditionIsTrue = async (getCondition: () => boolean) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (getCondition()) {
        resolve(true);
      } else {
        resolve(ensureAsyncConditionIsTrue(getCondition));
      }
    }, 1000);
  });
};

export const ApiProviderFirebase: FC<PropsWithChildren<IApiProviderProps>> = props => {
  const { baseUrl, storageName, children } = props;
  const authFb = getAuth(firebase);

  const refreshToken = async () => {
    const jwt = getToken();

    if (!jwt) {
      history.push("/login");
      setToken(null);
    }

    if (!authFb.currentUser) {
      await ensureAsyncConditionIsTrue(() => !!authFb.currentUser);
    }

    return authFb.currentUser
      ? authFb.currentUser
          .getIdToken(true)
          .then((accessToken: string) => {
            const now = Date.now();

            const jwt: IJwt = {
              accessToken,
              accessTokenExpiresAt: now + 1000 * 60 * 60,
              refreshToken: "",
              refreshTokenExpiresAt: now + 1000 * 60 * 60,
            };

            setToken(jwt);
            return jwt;
          })
          .catch((e: any) => {
            setToken(null);
            console.error(e);
            return null;
          })
      : Promise.resolve(null);
  };

  const getAuthToken = async (): Promise<string> => {
    let jwt = getToken();

    if (jwt) {
      if (isAccessTokenExpired()) {
        jwt = await refreshToken();
      }
    }

    return jwt ? jwt.accessToken : "";
  };

  const isRefreshTokenExpired = (): boolean => {
    return false;
  };

  // refreshToken every 4 minutes
  useInterval(() => void refreshToken(), 240000);

  return (
    <ApiProvider
      baseUrl={baseUrl}
      storageName={storageName}
      refreshToken={refreshToken}
      getAuthToken={getAuthToken}
      customIsRefreshTokenExpired={isRefreshTokenExpired}
    >
      {children}
    </ApiProvider>
  );
};
