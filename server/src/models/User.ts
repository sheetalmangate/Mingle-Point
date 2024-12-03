import { Schema, model, type Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import IScheduleDocument from "../interfaces/ScheduleDocument";

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name?: string;
  age?: number;
  hobbies?: string[];
  profilePicture?: string;
  pendingRequests: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
  meetingSchedules?: Types.ObjectId[] | IScheduleDocument[];
  
}

//Fields for name, age, hobbies, and profilePicture.
//Added pendingRequests, followers, and following arrays.

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    meetingSchedules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],

    
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    hobbies: {
      type: [String],
    },
    profilePicture: {
      type: String,
    },
    pendingRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre<IUser>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
