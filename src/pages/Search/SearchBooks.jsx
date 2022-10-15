import React from 'react';
import SearchContainer from "../../containers/Search/SearchBooksContainer";

const SearchBooks = (props) => {
    return (
        <div>
            <SearchContainer params={props.match.params} />
        </div>
    );
};

export default SearchBooks;