import Message from '../models/Message';
import User from '../models/User';
import * as Yup from 'yup';
import { Response } from 'express';
import { RequestWithUserId } from '../../type';
import ConnectedUsers from '../models/ConnectedUsers';

class MessageController {
  async store(req: any, res: Response) {
    const scheme = Yup.object().shape({
      content: Yup.string().required(),
      to: Yup.string().required(),
      from: Yup.string().required(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { content, to, from } = req.body;

    // if (from !== req.userId) {
    //   return res.status(401).json({ error: 'This action is not permitted.' });
    // }

    const sender = await User.findOne({ _id: to });

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    const recipient = await User.findOne({ _id: from });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const msg = await Message.create({
      content,
      from,
      to,
    });

    const message: any = await Message.findById(msg._id)
      .populate('from', 'name')
      .populate('to', 'name');

    // const ownerSocket: any = await ConnectedUsers.findOne({
    //   userId: message.to._id,
    // });
    const ownerSocket = req.connectedUsers[message.to._id];

    if (ownerSocket) {
      req.io
        .to(ownerSocket.socketId)
        .emit('receivedMessage', { data: message });
    }

    return res.json(message);
  }

  async index(req: any, res: Response) {
    const { recipient, page = 1 }: any = req.query;

    const messages = await Message.find({
      $or: [
        { to: recipient, from: req.userId },
        { to: req.userId, from: recipient },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(25)
      .skip((page - 1) * 25)
      .populate('from', 'name')
      .populate('to', 'name');

    messages.reverse();

    return res.json(messages);
  }

  async listUsers(req: any, res: Response) {
    const messages = await Message.find({
      $or: [{ from: req.userId }, { to: req.userId }],
    })
      .sort({ createdAt: -1 })
      .populate('from', ['name', 'email'])
      .populate('to', ['name', 'email']);

    let users: any = [];

    messages.forEach((value: any) => {
      if (value.from._id == req.userId) {
        if (!users.find((user: any) => user.email === value.to.email)) {
          users.push({
            _id: value.to._id,
            name: value.to.name,
            email: value.to.email,
          });
        }
      } else {
        if (!users.find((user: any) => user.email === value.from.email)) {
          users.push({
            _id: value.from._id,
            name: value.from.name,
            email: value.from.email,
          });
        }
      }
    });

    return res.json(users);
  }
}

export default new MessageController();
