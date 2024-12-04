import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../utils/mutations';

function SendMessage({  receiver, message, setMessage, onSendMessage }: { receiver: string; message: string; setMessage: (message: string) => void; onSendMessage: (message: string) => void }) {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    try {
    await sendMessage({ variables: { content: message ,username:receiver} });
    setMessage('');
    onSendMessage(message);
  } catch (err) {
    console.error('Error sending message:', err);
  }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default SendMessage;