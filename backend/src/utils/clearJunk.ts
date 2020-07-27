import { unlink } from 'fs';
import { resolve } from 'path';

export default (filename: string): boolean => {
  try {
    unlink(
      resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', filename),
      (err) => console.log(err)
    );

    return true;
  } catch (error) {
    return false;
  }
};
