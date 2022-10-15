import React from 'react';
import {useHistory} from 'react-router-dom';
import {PROFILE_ROUTE} from "../../routing/consts";
import UserContainer from "../../containers/User/UserContainer";

const User = (props) => {
    const history = useHistory();

    if(props.match.params.id === localStorage.getItem("username")){
        history.push(PROFILE_ROUTE);
    }
    return (
        <>
            <UserContainer username = {props.match.params.id}/>
        </>
    );
};

export default User;