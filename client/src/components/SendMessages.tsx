import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SEND_MESSAGE } from "../utils/mutations";
import { SendMessageProps } from "../interfaces/SendMessageProps";

function SendMessage({
  receiver,
  message,
  setMessage,
  onSendMessage,
}: SendMessageProps) {
  const { username } = useContext(UserContext);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    try {
      await sendMessage({
        variables: {
          content: message,
          sender: username,
          username: receiver,
        },
      });
      setMessage("");
      onSendMessage(message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}

export default SendMessage;
