import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

interface ProfileDetailsProps {
    profile: {
        name: string;
        age: number;
        hobbies: string[];
        profilePicture?: string;
    };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: profile.name,
        age: profile.age,
        hobbies: profile.hobbies.join(', '),
        profilePicture: profile.profilePicture || ''
    });

    const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
        onError: (error) => {
            console.error('Error updating profile:', error);
            console.error('GraphQL Errors:', error.graphQLErrors);
            console.error('Network Error:', error.networkError);
        },
        refetchQueries: [{ query: QUERY_USER }]
    });

    const handleEdit = async () => {
        if (isEditing) {
            try {
                const hobbies = formData.hobbies
                    .split(',')
                    .map((hobby) => hobby.trim())
                    .filter((hobby) => hobby !== '');
    
                await updateProfile({
                    variables: {
                        profileData: {
                            name: formData.name,
                            age: parseInt(formData.age.toString(), 10),
                            hobbies: hobbies,
                            profilePicture: formData.profilePicture,
                        },
                    },
                });
                setIsEditing(false);
            } catch (err) {
                console.error('Error updating profile:', err);
            }
        } else {
            setIsEditing(true);
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Profile Details</h3>
                <button
                    onClick={handleEdit}
                    className={`px-4 py-2 rounded ${
                        isEditing 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={profile.profilePicture || "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}
                        alt="Profile"
                        className="w-48 h-48 rounded-full object-cover"
                    />
                </div>

                <div className="space-y-4">
                    {isEditing ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                                    className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hobbies</label>
                                <input
                                    type="text"
                                    value={formData.hobbies}
                                    onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                                    className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Separate hobbies with commas"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                <input
                                    type="text"
                                    value={formData.profilePicture}
                                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                                    className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p><span className="font-semibold">Name:</span> {profile.name}</p>
                            <p><span className="font-semibold">Age:</span> {profile.age}</p>
                            <p><span className="font-semibold">Hobbies:</span> {profile.hobbies.join(', ')}</p>
                        </>
                    )}
                </div>
            </div>
            
            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    Error updating profile. Please try again.
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;