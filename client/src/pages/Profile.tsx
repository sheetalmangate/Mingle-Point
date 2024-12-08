import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import ProfileForm from "../components/ProfileForm";
import ProfileDetails from "../components/ProfileDetails";
import Schedule from "../components/Schedule";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
    const { data, loading } = useQuery(QUERY_USER);
    const { username } = useContext(UserContext);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Loading...</p>
        </div>;
    }

    // Check if user has profile data
    const hasProfile = data?.user && (data.user.name || data.user.age || data.user.hobbies?.length > 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Profile for {username}</h2>
            {hasProfile ? (
                <ProfileDetails 
                    profile={{
                        name: data.user.name,
                        age: data.user.age,
                        hobbies: data.user.hobbies || [],
                        profilePicture: data.user.profilePicture
                    }} 
                />
            ) : (
                <ProfileForm />
            )}
            <Schedule />
        </div>
    );
};

export default Profile;