import { Schema, model, Types } from "mongoose";

interface ISchedule  {
  _id: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  description: string | null;
  dateId: Types.ObjectId;
  location: string | null;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    date: {
      type: String,
      required: true,
      },
    startTime: {
      type: String,
      required: true,
      
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);





const Schedule = model<ISchedule>("Schedule", scheduleSchema);

export default Schedule;
