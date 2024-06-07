export interface IFirebase {
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: false;
  firebase: {
    identities: {
      email: Array<string>;
    };
    sign_in_provider: string;
  };
  uid: string;
}
