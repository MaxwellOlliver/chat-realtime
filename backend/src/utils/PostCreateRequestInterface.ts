import { Request } from 'express';
export default interface PostCreateRequestInterface extends Request {
  body: {
    game_reference?: string;
    existsMidia?: string;
    text?: string;
    is_ad?: boolean;
  };
  userId?: string;
}
