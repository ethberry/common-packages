export interface IJwt {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

export interface IJwks {
  email: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  picture: string;
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  at_hash: string;
  name: string;
  locale: string;
  iat: number;
  exp: number;
}
