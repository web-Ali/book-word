import React from 'react';
import EditBookContainer from "../../containers/Book/EditBookContainer";

const EditBook = (props) => {
    return (
        <div>
            <EditBookContainer id={props.match.params?.id}/>
        </div>
    );
};

export default EditBook;