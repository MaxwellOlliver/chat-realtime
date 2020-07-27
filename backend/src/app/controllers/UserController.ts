import User from '../models/User';
import * as Yup from 'yup';
import { Request, Response } from 'express';

class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export default new UserController();
