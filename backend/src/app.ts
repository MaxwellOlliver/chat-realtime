import * as dotenv from 'dotenv';
dotenv.config();

import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { createServer, Server } from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import routes from './routes';
import { promisify } from 'util';
import ConnectedUsers from './app/models/ConnectedUsers';

const connectedUsers: any = {};
class App {
  public express: express.Application;
  public server!: Server;
  private io!: socketIO.Server;

  constructor() {
    this.express = express();
    this.sockets();
    this.connection();
    this.ioConnection();
    this.middlewares();
  }

  sockets() {
    this.server = createServer(this.express);
    this.io = socketIO(this.server);
  }

  middlewares(): void {
    this.express.use((request: any, response: Response, next: NextFunction) => {
      request.io = this.io;
      request.connectedUsers = connectedUsers;
      return next();
    });
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(routes);
  }

  connection(): void {
    try {
      mongoose.connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      console.log('Mongoose connected');
    } catch (err) {
      console.log(err);
    }
  }

  ioConnection(): void {
    this.io.on('connection', async (socket: socketIO.Socket) => {
      const { token } = socket.handshake.query;

      try {
        const decoded: any = await promisify(jwt.verify)(
          token,
          `${process.env.SECRET}`
        );

        // let user = await ConnectedUsers.findById(decoded.id);

        // if (!user) {
        //   await ConnectedUsers.find({
        //     userId: decoded.id,
        //     socketId: socket.id,
        //   });

        //   console.log('Socket connected');
        // }

        connectedUsers[decoded.id] = socket.id;
      } catch (err) {
        console.log(err);
      }

      // socket.on('disconnect', async () => {
      //   // await ConnectedUsers.deleteOne({ socketId: socket.id });
      // });
    });
  }
}

export default new App().server;
