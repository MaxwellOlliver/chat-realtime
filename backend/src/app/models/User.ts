import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
  },

  password_hash: {
    type: String,
  },
});

UserSchema.virtual('password');

UserSchema.pre('save', async function (this: any, next) {
  this.password_hash = await bcrypt.hash(this.password, 8);
  return next();
});

UserSchema.method('checkPassword', async function (
  this: any,
  pass: string
): Promise<boolean> {
  return bcrypt.compare(pass, this.password_hash);
});

export default model('Users', UserSchema);
