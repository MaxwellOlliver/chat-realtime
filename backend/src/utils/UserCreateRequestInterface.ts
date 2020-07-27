import { Request } from 'express';

export default interface UserCreateRequestInterface extends Request {
  body: {
    name?: string;
    email?: string;
    password?: string;
    tel1?: string;
    tel2?: string;
    birth_date?: number;
    bio?: string;
    gender?: string;
    avatar?: string;
    background?: string;
    country?: string;
    state?: string;
  };
  userId?: string;
}
