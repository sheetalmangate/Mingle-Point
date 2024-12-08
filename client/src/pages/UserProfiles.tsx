import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { User } from '../interfaces/user';
import { useNavigate } from 'react-router-dom';

interface UserProfilesProps {
    currentUser: User;
}

const UserProfiles: React.FC<UserProfilesProps> = ({ currentUser }) => {
    const { data, loading, error } = useQuery(GET_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();  // Add this

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredUsers = data.users.filter((user: User) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = (username: string) => {
        navigate(`/chat?user=${username}`);  // Use navigate instead of window.location
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 border rounded-lg"
                />
            </div>

            <h2 className="text-2xl mb-4">User Profiles</h2>
            {filteredUsers.length === 0 ? (
                <p>No users found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredUsers.map((user: User) => (
                        <div key={user._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{user.username}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            {user._id !== currentUser._id && (
                                <button
                                    onClick={() => handleSendMessage(user.username)}
                                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Send Message
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProfiles;