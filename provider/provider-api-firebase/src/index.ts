import { Auth, getAuth } from "firebase/auth";

import firebase from "@gemunion/firebase";
import { history } from "@gemunion/history";
import { ApiProvider, IApiProviderProps } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

export class FirebaseApiProvider extends ApiProvider {
  protected authFb: Auth;
  protected timerId: any;

  constructor(props: IApiProviderProps) {
    super(props);

    this.authFb = getAuth(firebase);
    this.setTimeoutEffect();

    this.ensureUserExist = this.ensureUserExist.bind(this);
  }

  protected setTimeoutEffect(): void {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }

    // refresh accessToken every 4 minutes
    this.timerId = window.setTimeout(() => void this.refreshToken(), 240000);
  }

  async ensureUserExist() {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.authFb.currentUser) {
          resolve(true);
        } else {
          void this.ensureUserExist();
        }
      }, 1000);
    });
  }

  async refreshToken() {
    const jwt = this.getToken();

    if (!jwt) {
      history.push("/login");
      this.setToken(null);
    }

    this.setTimeoutEffect();

    if (!this.authFb.currentUser) {
      await this.ensureUserExist();
    }

    return this.authFb.currentUser
      ? this.authFb.currentUser
        .getIdToken(true)
        .then((accessToken: string) => {
          const now = Date.now();

          const jwt: IJwt = {
            accessToken,
            accessTokenExpiresAt: now + 1000 * 60 * 60,
            refreshToken: "",
            refreshTokenExpiresAt: now + 1000 * 60 * 60,
          };

          this.setToken(jwt);
          this.timerId = null;

          return jwt;
        })
        .catch((e: any) => {
          this.setToken(null);
          this.timerId = null;

          console.error(e);
          return null;
        })
      : Promise.resolve(null);
  }

  async getAuthToken() {
    let jwt = this.getToken();

    if (jwt) {
      if (this.isAccessTokenExpired()) {
        jwt = await this.refreshToken();
      }
    }

    return jwt ? jwt.accessToken : "";
  }

  isRefreshTokenExpired = (): boolean => {
    console.log("isRefreshTokenExpired");

    return false;
  };
}
