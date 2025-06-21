declare module 'express' {
  interface Request {
    headers: any;
    user?: {
      id: string;
      email: string;
    };
  }
}
