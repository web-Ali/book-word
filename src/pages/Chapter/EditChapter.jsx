import React from 'react';
import EditChapterContainer from "../../containers/Chapter/EditChapterContainer";

const EditChapter = (props) => {
    return (
        <div>
            <EditChapterContainer props={props.match.params}/>
        </div>
    );
};

export default EditChapter;