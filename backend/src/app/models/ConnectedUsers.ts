import { Schema, model, Types } from 'mongoose';

const ConnectedUsers = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});

export default model('ConnectedUsers', ConnectedUsers);
