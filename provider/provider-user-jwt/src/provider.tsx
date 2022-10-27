import { PropsWithChildren, ReactElement, useState } from "react";

import { IUser, UserProvider } from "@gemunion/provider-user";

interface IUserProviderJwtProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProviderJwt = <T extends IUser>(
  props: PropsWithChildren<IUserProviderJwtProps<T>>,
): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setUserProfile] = useState<T | null>(defaultProfile);

  return (
    <UserProvider profile={profile} setUserProfile={setUserProfile} storageName={storageName}>
      {children}
    </UserProvider>
  );
};
