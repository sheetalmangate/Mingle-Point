import { Types } from "mongoose";

export default interface IJwtPayload {
  _id: Types.ObjectId | string;
  username: string;
  email: string;
}
