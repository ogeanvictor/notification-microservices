export class AuthLoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
