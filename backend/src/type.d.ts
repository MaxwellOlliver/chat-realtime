import { Request } from 'express';
import { Socket } from 'socket.io';

export interface UserCreateRequestInterface extends Request {
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

export interface RequestWithUserId extends Request {
  userId?: string;
  io: Socket;
}

export interface PostCreateRequestInterface extends Request {
  body: {
    game_reference?: string;
    existsMidia?: string;
    text?: string;
    is_ad?: boolean;
  };
  userId?: string;
}
