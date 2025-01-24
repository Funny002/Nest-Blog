import * as code from 'express';

export declare module 'express' {
  interface User {
    uid: number;
  }

  interface Request extends code.Request {
    user: User;
  }
}
