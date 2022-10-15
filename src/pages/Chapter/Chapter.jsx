import React from 'react';
import ChapterContainer from "../../containers/Chapter/ChapterContainer";

const Chapter = (props) => {
    return (
        <div>
            <ChapterContainer props={props.match.params}/>
        </div>
    );
};

export default Chapter;