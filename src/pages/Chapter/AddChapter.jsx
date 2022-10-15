import React from 'react';
import AddChapterContainer from "../../containers/Chapter/AddChapterContainer";

const AddChapter = (props) => {


    return (
        <div>
            <AddChapterContainer bookid={props.match.params.bookid}/>
        </div>
    );
};

export default AddChapter;