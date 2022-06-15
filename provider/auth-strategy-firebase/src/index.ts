// eslint-disable-next-line import/no-extraneous-dependencies
import { Auth, getAuth } from "firebase/auth";

import firebase from "@gemunion/firebase";
import { history } from "@gemunion/history";
import { IApiProviderProps, IAuthStrategy } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

export const getFirebaseAuthStrategy = (props: IApiProviderProps): IAuthStrategy => {
  return new FirebaseAuthStrategyClass(props);
}

export class FirebaseAuthStrategyClass implements IAuthStrategy {
  baseUrl: string;
  storageName: string;
  protected authFb: Auth;
  protected timerId: any;

  constructor(props: IApiProviderProps) {
    this.baseUrl = props.baseUrl;
    this.storageName = props.storageName || "jwt";

    this.authFb = getAuth(firebase);
    this.setTimeoutEffect();
  }

  protected setTimeoutEffect(): void {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }

    // refresh accessToken every 4 minutes
    this.timerId = window.setTimeout(() => void this.refreshToken(), 20000);
  }

  protected read(key: string): IJwt | null {
    const jwt = localStorage.getItem(key);
    return jwt ? (JSON.parse(jwt) as IJwt) : null;
  }

  protected save(key: string, jwt: IJwt | null): void {
    const json = JSON.stringify(jwt);
    localStorage.setItem(key, json);
  }

  setToken(jwt: IJwt | null): void {
    return this.save(this.storageName, jwt);
  }

  getToken(): IJwt | null {
    return this.read(this.storageName);
  }

  async ensureUserExist() {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.authFb.currentUser) {
          resolve(true);
        } else {
          resolve(this.ensureUserExist);
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

  isAccessTokenExpired(): boolean {
    const jwt = this.getToken();

    return !!jwt && jwt.accessTokenExpiresAt < Date.now();
  }

  isRefreshTokenExpired(): boolean {
    return false;
  }
}
