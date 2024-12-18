import type { Types } from "mongoose";

export default interface IScheduleDocument {
  _id: Types.ObjectId | string;
  startTime: string;
  endTime: string;
  description: string | null;
  dateId: Types.ObjectId;
  location: string | null;
}
