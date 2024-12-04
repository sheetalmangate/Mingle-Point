import Message from '../models/Message.js'; // Adjust the path as necessary

export const saveMessage = async (sender: string, receiver: string, content: string) => {
  const message = new Message({ sender, receiver, content });
  await message.save();
  console.log('Message saved:', message);
  return message;
}

export const getMessages = async (sender: string, receiver: string) => {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order
    return messages;
  };