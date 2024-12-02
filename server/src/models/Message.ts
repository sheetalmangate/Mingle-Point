import { Schema, model, Types } from "mongoose";

interface IMessage{
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    content: string;
    timestamp: string;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Message = model<IMessage>("Message", messageSchema);
export default Message;