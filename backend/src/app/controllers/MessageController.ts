import Message from '../models/Message';
import User from '../models/User';
import * as Yup from 'yup';
import { Response } from 'express';
import RequestWithUserId from '../../utils/RequestWithUserId';

class MessageController {
  async store(req: RequestWithUserId, res: Response) {
    const scheme = Yup.object().shape({
      content: Yup.string().required(),
      to: Yup.string().required(),
      from: Yup.string().required(),
    });

    if (!(await scheme.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { content, to, from } = req.body;

    if (from !== req.userId) {
      return res.status(401).json({ error: 'This action is not permitted.' });
    }

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

    const message = await Message.findOne({ _id: msg._id })
      .populate('from', 'name')
      .populate('to', 'name');

    // const ownerSocket = req.connectedUsers[message.to._id];

    // if (ownerSocket) {
    //   req.io.to(ownerSocket).emit('message', message);
    // }

    return res.json(message);
  }

  async index(req: RequestWithUserId, res: Response) {
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

  // async index(req: RequestWithUserId, res: Response) {
  //   const messagesSent = await Message.find({ from: req.userId })
  //     .populate('from', 'name')
  //     .populate('to', 'name');
  //   const messagesReceived = await Message.find({ to: req.userId })
  //     .populate('from', 'name')
  //     .populate('to', 'name');

  //   let arr: any = [...messagesReceived, ...messagesSent];
  //   let users: any = [];
  //   arr.map((value: any) => {
  //     if (value.from._id == req.userId) {
  //       if (!users.includes(`${value.to.name}.${value.to._id}`)) {
  //         users.push(`${value.to.name}.${value.to._id}`);
  //       }
  //     } else {
  //       if (!users.includes(`${value.from.name}.${value.from._id}`)) {
  //         users.push(`${value.from.name}.${value.from._id}`);
  //       }
  //     }
  //   });

  //   return res.json({ users, user_id: req.userId });
  // }
}

export default new MessageController();
