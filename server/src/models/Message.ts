import { Schema, model} from "mongoose";

interface IMessage{
    sender: String;
    receiver: String;
    content: string;
    timestamp: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now ,
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