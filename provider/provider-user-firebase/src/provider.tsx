import { PropsWithChildren, ReactElement, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import firebase from "@ethberry/firebase";
import { useApi } from "@ethberry/provider-api";
import { ILoginDto, ISignUpDto, IUser, UserProvider } from "@ethberry/provider-user";

interface IUserProviderFirebaseProps<T> {
  profile?: T | null;
  storageName?: string;
}

export const UserProviderFirebase = <T extends IUser>(
  props: PropsWithChildren<IUserProviderFirebaseProps<T>>,
): ReactElement | null => {
  const { profile: defaultProfile = null, storageName = "user", children } = props;

  const [profile, setUserProfile] = useState<T | null>(defaultProfile);
  const api = useApi();

  const auth = getAuth(firebase);

  const logIn = async (data: ILoginDto) => {
    return signInWithEmailAndPassword(auth, data.email, data.password).then(userCredentials => {
      return userCredentials.user.getIdToken(true).then(accessToken => {
        const now = Date.now();
        api.setToken({
          accessToken,
          accessTokenExpiresAt: now + 1000 * 60 * 60,
          refreshToken: "",
          refreshTokenExpiresAt: now + 1000 * 60 * 60,
        });
      });
    });
  };

  const logOut = async () => {
    await signOut(getAuth());
    api.setToken(null);
  };

  const signUp = async (data: ISignUpDto) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(async userCredentials => {
      await updateProfile(userCredentials.user, { displayName: data.displayName });
      await sendEmailVerification(userCredentials.user, {
        url: `${window.location.origin}/login`,
      });
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
