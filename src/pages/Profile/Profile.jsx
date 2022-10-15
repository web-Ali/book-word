import React from 'react';
import ProfileContainer from "../../containers/Profile/ProfileContainer";
import Helmet from "react-helmet";

const Profile = () => {


    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <ProfileContainer/>
        </>
    );
};

export default Profile;