import React from 'react';
import VerifyContainer from "../../containers/Registration/VerifyContainer";

const Verify = (props) => {
    return (
        <div>
            <VerifyContainer code={props.match.params.code}/>
        </div>
    );
};

export default Verify;