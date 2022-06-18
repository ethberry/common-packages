import { FC } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from "firebase/auth";

import firebase from "@gemunion/firebase";
import { history } from "@gemunion/history";
import { ApiProvider, IApiProviderProps, getToken, setToken, isAccessTokenExpired } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

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

export const FirebaseApiProvider: FC<IApiProviderProps> = props => {
  const { baseUrl, storageName = "jwt" } = props;
  const authFb = getAuth(firebase);

  let timerId: any = null;

  const refreshToken = async () => {
    const jwt = getToken();

    if (!jwt) {
      history.push("/login");
      setToken(null);
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setTimeoutEffect();

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
            timerId = null;

            return jwt;
          })
          .catch((e: any) => {
            setToken(null);
            timerId = null;

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

  function setTimeoutEffect(): void {
    if (timerId) {
      window.clearTimeout(timerId);
    }

    // refresh accessToken every 4 minutes
    timerId = window.setTimeout(() => void refreshToken(), 240000);
  }

  setTimeoutEffect();

  return (
    <ApiProvider
      baseUrl={baseUrl}
      storageName={storageName}
      refreshToken={refreshToken}
      getAuthToken={getAuthToken}
      customIsRefreshTokenExpired={isRefreshTokenExpired}
    >
      {props.children}
    </ApiProvider>
  );
};
