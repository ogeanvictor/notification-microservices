import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      headers: any;
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
