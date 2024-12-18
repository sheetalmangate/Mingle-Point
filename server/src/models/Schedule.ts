import { Schema, model, Types } from "mongoose";

interface ISchedule  {
  _id: Types.ObjectId;
  date: string;
  startDate: string;
  endDate: string;
  description: string | null;
  dateId: Types.ObjectId;
  location: string | null;
  text: string;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    
    startDate: {
      type: String,
      required: true,
      
    },
    endDate: {
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
    text: {
      type: String,
      required: true,
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
