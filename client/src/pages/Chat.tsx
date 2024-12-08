import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessages';
import { User } from '../interfaces/user';

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter out the current user from the list
  const otherUsers = data.users.filter((u: User) => u.username !== user.username);

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
  };

  const handleSendMessage = (message: string) => {
    // Implement the logic to send a message
    console.log(`Message sent from ${user.username} to ${selectedUser}: ${message}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Welcome, {user.username}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-xl mb-2">Available Users</h3>
          <ul className="divide-y">
            {otherUsers.map((u: User) => (
              <li 
                key={u._id}
                onClick={() => handleUserSelect(u.username)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedUser === u.username ? 'bg-blue-50' : ''
                }`}
              >
                {u.username}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          {selectedUser ? (
            <>
              <h3 className="text-xl mb-2">Chatting with {selectedUser}</h3>
              <div className="border rounded-lg p-4 h-[400px] overflow-y-auto mb-4">
                <Messages sender={user.username} receiver={selectedUser} />
              </div>
              <SendMessage
                receiver={selectedUser}
                message={newMessage}
                setMessage={setNewMessage}
                onSendMessage={handleSendMessage}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;