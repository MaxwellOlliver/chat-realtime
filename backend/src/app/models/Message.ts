import { Schema, model, Types } from 'mongoose';

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    to: {
      type: Types.ObjectId,
      required: true,
      ref: 'Users',
    },

    from: {
      type: Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Messages', MessageSchema);
