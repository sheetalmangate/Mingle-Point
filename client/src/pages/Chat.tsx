import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessages';

function Chat({ user }: { user: { username: string } }) {
  const { data, loading, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
  };

  const handleSendMessage = (message: string) => {
    // Implement the logic to send a message
    console.log(`Message sent from ${user.username} to ${selectedUser}: ${message}`);
  };

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div>
        <h3>Select a user to chat with:</h3>
        <ul>
          {data.users.map((u: { _id: string; username: string }) => (
            <li key={u._id} onClick={() => handleUserSelect(u.username)}>
              {u.username}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h3>Chatting with {selectedUser}</h3>
          <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
            <Messages sender={user.username} receiver={selectedUser} />
          </div>
          <SendMessage
            receiver={selectedUser}
            message={newMessage}
            setMessage={setNewMessage}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;