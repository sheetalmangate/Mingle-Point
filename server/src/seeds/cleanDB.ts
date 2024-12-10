import { User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('Profile collection cleaned.');
  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
