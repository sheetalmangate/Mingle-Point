import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import ProfileForm from "../components/ProfileForm";
import ProfileDetails from "../components/ProfileDetails";
import Schedule from "../components/Schedule";
import { useParams } from 'react-router-dom';
import { ScheduleProps } from '../interfaces/ProfileTypes';

const Profile = () => {
    const { userId } = useParams();
    const { data, loading } = useQuery(QUERY_USER, {
        variables: { _id: userId }
    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Loading...</p>
        </div>;
    }

    const userProfile = data?.user;
    const isOwnProfile = !userId || userProfile?._id === data?.user?._id;
    const hasProfile = userProfile && (userProfile.name || userProfile.age || userProfile.hobbies?.length > 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">
                {isOwnProfile ? 'My Profile' : `${userProfile?.username}'s Profile`}
            </h2>
            
            {hasProfile ? (
                <ProfileDetails 
                    profile={{
                        name: userProfile.name,
                        age: userProfile.age,
                        hobbies: userProfile.hobbies || [],
                        profilePicture: userProfile.profilePicture
                    }}
                    isEditable={isOwnProfile}
                />
            ) : (
                isOwnProfile ? (
                    <ProfileForm initialData={userProfile} />
                ) : (
                    <p>Profile not found</p>
                )
            )}
            
            {userProfile && (
                <Schedule 
                    userId={userProfile._id}
                    isOwnSchedule={isOwnProfile}
                />
            )}
        </div>
    );
};

export default Profile;