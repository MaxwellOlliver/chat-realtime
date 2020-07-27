import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { resolve } from 'path';
import cors from 'cors';

import routes from './routes';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.connection();
    this.middlewares();
  }

  middlewares(): void {
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
}

export default new App().express;
