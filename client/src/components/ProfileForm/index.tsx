import { type FormEvent, useState, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

const ProfileForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    hobbies: '',
    profilePicture: ''
  });

  const [addProfile, { error }] = useMutation(ADD_PROFILE, {
    refetchQueries: [{ query: QUERY_USER }],
    onCompleted: () => {
      // Add success message or redirect to profile page
      
    }
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const hobbies = formState.hobbies.split(",").map(hobby => hobby.trim()).filter(hobby => hobby !== "");

      await addProfile({
        variables: {
          name: formState.name,
          age: parseInt(formState.age),
          hobbies: hobbies,
          profilePicture: formState.profilePicture || "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
        },
      });

      setFormState({
        name: '',
        age: '',
        hobbies: '',
        profilePicture: ''
      });

    } catch (err) {
      console.error('Error adding profile:', err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">Tell About Yourself...</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Add your name..."
            value={formState.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="age"
            type="number"
            placeholder="Add your age..."
            value={formState.age}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="hobbies"
            placeholder="Add your hobbies (comma-separated)..."
            value={formState.hobbies}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="profilePicture"
            placeholder="Add your profile picture link..."
            value={formState.profilePicture}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Create Profile
        </button>
        
        {error && (
          <div className="text-red-500 text-center mt-2">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;