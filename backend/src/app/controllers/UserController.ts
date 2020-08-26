import User from '../models/User';
import * as Yup from 'yup';
import { Request, Response } from 'express';
import { RequestWithUserId } from '../../type';

class UserController {
  async store(req: any, res: Response) {
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

  async index(req: Request, res: Response) {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({ error: 'Query not provided' });
    }

    const regex = new RegExp(`^${q}`);

    const users = await User.find({ email: regex });

    return res.json(users);
  }

  async show(req: any, res: Response) {
    const user = await User.findById(req.userId);

    return res.json(user);
  }
}

export default new UserController();
