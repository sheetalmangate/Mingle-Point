import { Types } from "mongoose";

export default interface IUserContext {
  user: {
    username: string | null;
    email: string | null;
    _id: Types.ObjectId | null | string;
  } | null;
}
