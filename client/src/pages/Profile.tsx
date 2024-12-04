import Schedule from "../components/Schedule";
import ProfileForm from "../components/ProfileForm";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Profile = () => {
    const {data, loading} = useQuery( QUERY_USER );

    const userData = data?.user || {};
    console.log(userData)
    if(loading) {
        return <h3>loading....</h3>
    }
    return (
        <div>
            <h2>Profile</h2>
            <h2><ProfileForm /></h2>
            <Schedule />
        </div>
    )
}
export default Profile ;