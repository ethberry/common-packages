import { PropsWithChildren, ReactElement, useState } from "react";

import { ILoginDto, ISignUpDto, IUser, UserProvider } from "@ethberry/provider-user";
import { ApiError, IJwt, useApi } from "@ethberry/provider-api";

interface IUserProviderJwtProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProviderJwt = <T extends IUser>(
  props: PropsWithChildren<IUserProviderJwtProps<T>>,
): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setUserProfile] = useState<T | null>(defaultProfile);

  const api = useApi();

  const logIn = async (data?: ILoginDto) => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        api.setToken(json);
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        throw e;
      });
  };

  const logOut = async () => {
    await api
      .fetchJson({
        url: "/auth/logout",
        method: "POST",
        data: {
          refreshToken: api.getToken()?.refreshToken,
        },
      })
      .finally(() => {
        api.setToken(null);
      });
  };

  const signUp = async (data: ISignUpDto) => {
    await api
      .fetchJson({
        url: "/auth/signup",
        method: "POST",
        data,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return json;
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        throw e;
      });
  };

  return (
    <UserProvider
      profile={profile}
      setUserProfile={setUserProfile}
      customLogIn={logIn}
      customLogOut={logOut}
      customSignUp={signUp}
      storageName={storageName}
    >
      {children}
    </UserProvider>
  );
};
