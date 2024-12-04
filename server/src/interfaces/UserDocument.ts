
import type { Types } from "mongoose";
import IScheduleDocument from "./ScheduleDocument";

export default interface IUserDocument {
  _id: Types.ObjectId | string;
  username: string | null;
  email: string | null;
  password: string;
  name?: string;
  age?: number;
  hobbies?: string[];
  profilePicture?: string;
  pendingRequests: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  meetingSchedules?: Types.ObjectId[] | IScheduleDocument[];

  isCorrectPassword(password: string): Promise<boolean>;
}
