import { User } from './user.js'; // Adjust the path as necessary

export interface Auth {
    token: string;
    user: User;
  }