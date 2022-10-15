import React  from 'react';
import {useHistory} from "react-router-dom";

import {MAIN_ROUTE} from "../../routing/consts";
import RegistrationContainer from "../../containers/Registration/RegistrationContainer";

const Registration = () => {
    const history = useHistory();

    if(localStorage.getItem('id')){
        history.push(MAIN_ROUTE)
    }
    return (
        <div>

            <RegistrationContainer/>
        </div>
    );
};

export default Registration;