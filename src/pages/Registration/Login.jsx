import React from 'react';
import LoginContainer from "../../containers/Registration/LoginContainer";

const Login = (props) => {


    return (
        <div>

            <LoginContainer props={props.location.state?.data ? props.location.state.data : null}/>
        </div>
    );
};

export default Login;