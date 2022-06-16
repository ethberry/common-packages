import { history } from "@gemunion/history";
import { fetchJson, ApiProvider, IApiProviderProps } from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";

export class JwtApiProvider extends ApiProvider {
  constructor(props: IApiProviderProps) {
    super(props);
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
}
