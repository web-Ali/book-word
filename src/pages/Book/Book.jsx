import React from 'react';
import BookContainer from "../../containers/Book/BookContainer";

const Book = (props) => {

    return (

        <div className="container">
            <BookContainer id={props.match.params?.id}/>
        </div>

    );
};

export default Book;