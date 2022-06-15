// eslint-disable-next-line import/no-extraneous-dependencies

import { history } from "@gemunion/history";
import { IApiProviderProps, IAuthStrategy, fetchJson } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

export class JwtAuthStrategyClass implements IAuthStrategy {
  baseUrl: string;
  storageName: string;

  constructor(props: IApiProviderProps) {
    this.baseUrl = props.baseUrl;
    this.storageName = props.storageName || "jwt";
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

  async refreshToken() {
    const jwt = this.getToken();

    if (jwt) {
      return fetchJson(`${this.baseUrl}/auth/refresh`, {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        }),
        credentials: "include",
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          refreshToken: jwt.refreshToken,
        }),
      })
        .then((json: IJwt) => {
          this.setToken(json);
          return json;
        })
        .catch(e => {
          console.error(e);
          this.setToken(null);
          return null;
        });
    }

    return null;
  }

  async getAuthToken() {
    let jwt = this.getToken();

    if (jwt) {
      if (this.isAccessTokenExpired()) {
        if (this.isRefreshTokenExpired()) {
          history.push("/login");
          this.setToken(null);
          throw Object.assign(new Error("unauthorized"), { status: 401 });
        }

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
    const jwt = this.getToken();

    return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
  }
}

export const getJwtAuthStrategy = (props: IApiProviderProps): IAuthStrategy => {
  return new JwtAuthStrategyClass(props);
};
