import { Types } from 'mongoose';
import {PubSub} from "graphql-subscriptions"

export interface IUser {
  username: string;
  email: string;
  _id: Types.ObjectId;
}

export default interface Context {
  user: IUser | null;
  pubsub: PubSub;
}