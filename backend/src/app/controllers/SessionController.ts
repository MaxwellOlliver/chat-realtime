import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';

interface RequestSession extends Request {
  email?: string;
  password?: string;
}

class SessionController {
  async create(request: Request, response: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' });
    }

    const { email, password }: RequestSession = request.body;

    const user: any = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(400).json({ error: 'Password does not match.' });
    }

    return response.json({
      user,
      token: jwt.sign({ id: user._id }, `${process.env.SECRET}`),
    });
  }
}

export default new SessionController();
